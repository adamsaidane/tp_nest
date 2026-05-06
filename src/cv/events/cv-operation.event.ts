// src/cv/events/cv-operation.event.ts
import { CvOperation } from '../../cv-log/entities/cv-log.entity';
import { User } from '../../user/entities/user.entity';

export class CvOperationEvent {
    constructor(
        public readonly operation: CvOperation,
        public readonly cvId: number,
        public readonly performedBy: User,
    ) {}
}