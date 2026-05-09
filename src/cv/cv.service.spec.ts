import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CvService', () => {
  let service: CvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvService,
        {
          provide: getRepositoryToken(Cv),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: {},
        },
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CvService>(CvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
