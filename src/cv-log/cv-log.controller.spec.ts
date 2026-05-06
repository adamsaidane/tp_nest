import { Test, TestingModule } from '@nestjs/testing';
import { CvLogController } from './cv-log.controller';
import { CvLogService } from './cv-log.service';

describe('CvLogController', () => {
  let controller: CvLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvLogController],
      providers: [CvLogService],
    }).compile();

    controller = module.get<CvLogController>(CvLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
