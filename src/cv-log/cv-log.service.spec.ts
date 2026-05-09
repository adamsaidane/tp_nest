import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CvLog } from './entities/cv-log.entity';
import { CvLogService } from './cv-log.service';

describe('CvLogService', () => {
  let service: CvLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvLogService,
        {
          provide: getRepositoryToken(CvLog),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CvLogService>(CvLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
