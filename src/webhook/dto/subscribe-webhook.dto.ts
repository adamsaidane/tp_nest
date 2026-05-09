import { IsOptional, IsString, IsUrl } from 'class-validator';

export class SubscribeWebhookDto {
  @IsUrl({ require_tld: false })
  url: string;

  @IsOptional()
  @IsString()
  event?: string;
}
