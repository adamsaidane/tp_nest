import { CvOperation } from '../cv-log/entities/cv-log.entity';
import { CvOperationEvent } from '../cv/events/cv-operation.event';
import { User } from '../user/entities/user.entity';
import { WebhookListener } from './webhook.listener';
import { WebhookService } from './webhook.service';

describe('WebhookListener', () => {
  let listener: WebhookListener;
  let webhookService: jest.Mocked<Pick<WebhookService, 'dispatch'>>;
  const user = { id: 1, username: 'admin' } as User;

  beforeEach(() => {
    webhookService = {
      dispatch: jest.fn().mockResolvedValue(undefined),
    };
    listener = new WebhookListener(webhookService as WebhookService);
  });

  it('dispatches cv.created when a CV is created', async () => {
    await listener.handle(new CvOperationEvent(CvOperation.CREATE, 10, user));

    expect(webhookService.dispatch).toHaveBeenCalledWith('cv.created', {
      cvId: 10,
      createdBy: 'admin',
    });
  });

  it('ignores non-create CV operations', async () => {
    await listener.handle(new CvOperationEvent(CvOperation.UPDATE, 10, user));

    expect(webhookService.dispatch).not.toHaveBeenCalled();
  });
});
