import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookSubscription } from './entities/webhook-subscription.entity';
import { WebhookController } from './webhook.controller';
import { WebhookListener } from './webhook.listener';
import { WebhookService } from './webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebhookSubscription])],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookListener],
  exports: [WebhookService],
})
export class WebhookModule {}
