import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookSubscription } from './entities/webhook-subscription.entity';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(WebhookSubscription)
    private readonly subscriptionRepository: Repository<WebhookSubscription>,
  ) {}

  async subscribe(
    url: string,
    event: string = 'cv.created',
  ): Promise<WebhookSubscription> {
    const subscription = this.subscriptionRepository.create({
      url: this.normalizeUrl(url),
      event: event?.trim() || 'cv.created',
    });

    return this.subscriptionRepository.save(subscription);
  }

  findByEvent(event: string): Promise<WebhookSubscription[]> {
    return this.subscriptionRepository.findBy({ event });
  }

  async dispatch(event: string, payload: unknown): Promise<void> {
    const subscribers = await this.findByEvent(event);

    await Promise.all(
      subscribers.map((subscription) =>
        this.send(subscription, event, payload),
      ),
    );
  }

  private async send(
    subscription: WebhookSubscription,
    event: string,
    payload: unknown,
  ): Promise<void> {
    try {
      const response = await fetch(subscription.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          payload,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        this.logger.warn(
          `Webhook failed for ${subscription.url}: HTTP ${response.status}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `Webhook failed for ${subscription.url}: ${this.getErrorMessage(error)}`,
      );
    }
  }

  private normalizeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Unsupported protocol');
      }

      return parsedUrl.toString();
    } catch {
      throw new BadRequestException('Webhook URL must be a valid HTTP(S) URL');
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }
}
