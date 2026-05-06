import { Controller, Get, Sse, UseGuards } from '@nestjs/common';
import { SseService } from './sse.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sse')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse('admin')
  @UseGuards(RolesGuard)
  @Roles('admin')
  streamAdmin() {
    return this.sseService.getAdminStream();
  }

  @Sse('stream')
  streamUser(@CurrentUser() user: User) {
    if (user.role === 'admin') {
      return this.sseService.getAdminStream();
    }
    return this.sseService.getUserStream(user.id);
  }
}