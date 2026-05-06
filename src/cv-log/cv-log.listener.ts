import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CvLogService } from './cv-log.service';
import { CvOperationEvent } from '../cv/events/cv-operation.event';

@Injectable()
export class CvLogListener {
    constructor(private readonly cvLogService: CvLogService) {}

    @OnEvent('cv.operation')
    async handle(event: CvOperationEvent): Promise<void> {
        await this.cvLogService.log(event.operation, event.cvId, event.performedBy);
    }
}