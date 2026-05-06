import { PartialType } from '@nestjs/swagger';
import { CreateCvLogDto } from './create-cv-log.dto';

export class UpdateCvLogDto extends PartialType(CreateCvLogDto) {}
