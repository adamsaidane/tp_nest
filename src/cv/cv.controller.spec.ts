import { Test, TestingModule } from '@nestjs/testing';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('CvController', () => {
  let controller: CvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvController],
      providers: [
        {
          provide: CvService,
          useValue: {},
        },
        {
          provide: RolesGuard,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CvController>(CvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
