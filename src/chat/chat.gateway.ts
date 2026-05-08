// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map socketId -> User
  private connectedUsers = new Map<string, User>();

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      const token: string =
        (client.handshake.auth?.token as string) ||
        (client.handshake.headers?.authorization?.split(' ')[1] as string) ||
        '';

      const payload = this.jwtService.verify(token) as { userId: number };

      const user = await this.userRepository.findOneBy({
        id: payload.userId,
      });
      if (!user) {
        client.disconnect();
        return;
      }
      this.connectedUsers.set(client.id, user);
      const history = await this.chatService.findAll();
      client.emit('history', history);
      this.server.emit('user_joined', { username: user.username });
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      this.server.emit('user_left', { username: user.username });
      this.connectedUsers.delete(client.id);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { content: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;
    const message = await this.chatService.saveMessage(data.content, user);
    this.server.emit('new_message', message);
  }

  @SubscribeMessage('like_message')
  async handleLike(
    @MessageBody() data: { messageId: number },
  ): Promise<void> {
    const updated = await this.chatService.likeMessage(data.messageId);
    this.server.emit('message_liked', {
      messageId: updated.id,
      likes: updated.likes,
    });
  }
}
