import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { User } from '../user/entities/user.entity';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: ChatService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
