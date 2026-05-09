import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookSubscription } from './entities/webhook-subscription.entity';
import { WebhookService } from './webhook.service';

describe('WebhookService', () => {
  let service: WebhookService;
  let repository: jest.Mocked<
    Pick<Repository<WebhookSubscription>, 'create' | 'save' | 'findBy'>
  >;

  beforeEach(async () => {
    repository = {
      create: jest.fn((value) => value as WebhookSubscription),
      save: jest.fn((value) =>
        Promise.resolve({
          id: 1,
          createdAt: new Date(),
          ...value,
        }),
      ),
      findBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: getRepositoryToken(WebhookSubscription),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a subscription with the default cv.created event', async () => {
    await service.subscribe('https://example.com/hook');

    expect(repository.create).toHaveBeenCalledWith({
      url: 'https://example.com/hook',
      event: 'cv.created',
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('rejects unsupported webhook URLs', async () => {
    await expect(service.subscribe('ftp://example.com/hook')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('dispatches a POST request to all subscribers of an event', async () => {
    repository.findBy.mockResolvedValue([
      {
        id: 1,
        url: 'https://example.com/hook',
        event: 'cv.created',
        createdAt: new Date(),
      },
    ]);
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ ok: true } as Response);

    await service.dispatch('cv.created', { cvId: 1, createdBy: 'admin' });

    expect(repository.findBy).toHaveBeenCalledWith({ event: 'cv.created' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/hook',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });
});
