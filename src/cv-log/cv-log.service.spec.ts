import { Test, TestingModule } from '@nestjs/testing';
import { CvLogService } from './cv-log.service';

describe('CvLogService', () => {
  let service: CvLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvLogService],
    }).compile();

    service = module.get<CvLogService>(CvLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
