import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OnEvent } from '@nestjs/event-emitter';
import { CvOperationEvent } from '../cv/events/cv-operation.event';

interface SseMessage {
  userId: number | null; // null = admin broadcast
  data: any;
}

@Injectable()
export class SseService {
  private subject = new Subject<SseMessage>();

  @OnEvent('cv.operation')
  handleCvOperation(event: CvOperationEvent): void {
    this.subject.next({
      userId: null,
      data: {
        operation: event.operation,
        cvId: event.cvId,
        performedBy: event.performedBy.username,
        date: new Date(),
      },
    });

    this.subject.next({
      userId: event.performedBy.id,
      data: {
        operation: event.operation,
        cvId: event.cvId,
        date: new Date(),
      },
    });
  }

  getAdminStream() {
    return this.subject.asObservable().pipe(
        map((msg) => ({ data: msg.data })),
    );
  }

  getUserStream(userId: number) {
    return this.subject.asObservable().pipe(
        filter((msg) => msg.userId === userId),
        map((msg) => ({ data: msg.data })),
    );
  }
}