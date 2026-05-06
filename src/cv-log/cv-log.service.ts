// src/cv-log/cv-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvLog, CvOperation } from './entities/cv-log.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CvLogService {
  constructor(
      @InjectRepository(CvLog)
      private cvLogRepository: Repository<CvLog>,
  ) {}

  async log(operation: CvOperation, cvId: number, performedBy: User): Promise<CvLog> {
    const entry = this.cvLogRepository.create({ operation, cvId, performedBy });
    return this.cvLogRepository.save(entry);
  }

  findAll(): Promise<CvLog[]> {
    return this.cvLogRepository.find({ relations: ['performedBy'] });
  }

  findByUser(userId: number): Promise<CvLog[]> {
    return this.cvLogRepository.find({
      where: { performedBy: { id: userId } },
      relations: ['performedBy'],
    });
  }
}