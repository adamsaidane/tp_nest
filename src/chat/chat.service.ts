// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  private sanitizeMessage(message: Message): MessageResponseDto {
    return {
      id: message.id,
      content: message.content,
      likes: message.likes,
      createdAt: message.createdAt,
      sender: {
        id: message.sender.id,
        username: message.sender.username,
        email: message.sender.email,
      },
    };
  }

  async saveMessage(
    content: string,
    sender: User,
  ): Promise<MessageResponseDto> {
    const msg = this.messageRepository.create({ content, sender });
    const saved = await this.messageRepository.save(msg);
    return this.sanitizeMessage(saved);
  }

  async likeMessage(id: number): Promise<MessageResponseDto> {
    const msg = await this.messageRepository.findOneBy({ id });
    if (!msg) throw new Error('Message not found');
    msg.likes += 1;
    const updated = await this.messageRepository.save(msg);
    return this.sanitizeMessage(updated);
  }

  async findAll(): Promise<MessageResponseDto[]> {
    const messages = await this.messageRepository.find({
      relations: ['sender'],
    });
    return messages.map((msg) => this.sanitizeMessage(msg));
  }
}
