// src/cv-log/cv-log.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvLog } from './entities/cv-log.entity';
import { CvLogService } from './cv-log.service';
import { CvLogController } from './cv-log.controller';
import { CvLogListener } from './cv-log.listener';

@Module({
  imports: [TypeOrmModule.forFeature([CvLog])],
  providers: [CvLogService, CvLogListener],
  controllers: [CvLogController],
  exports: [CvLogService],
})
export class CvLogModule {}