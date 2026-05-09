import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CvOperation } from '../cv-log/entities/cv-log.entity';
import { CvOperationEvent } from '../cv/events/cv-operation.event';
import { WebhookService } from './webhook.service';

@Injectable()
export class WebhookListener {
  constructor(private readonly webhookService: WebhookService) {}

  @OnEvent('cv.operation')
  async handle(event: CvOperationEvent): Promise<void> {
    if (event.operation !== CvOperation.CREATE) {
      return;
    }

    await this.webhookService.dispatch('cv.created', {
      cvId: event.cvId,
      createdBy: event.performedBy.username,
    });
  }
}
