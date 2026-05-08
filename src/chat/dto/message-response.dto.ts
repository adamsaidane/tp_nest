// src/chat/dto/message-response.dto.ts
export class MessageResponseDto {
  id: number;
  content: string;
  likes: number;
  createdAt: Date;
  sender: {
    id: number;
    username: string;
    email: string;
  };
}

