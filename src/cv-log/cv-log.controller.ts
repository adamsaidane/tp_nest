import { Controller, Get, UseGuards } from '@nestjs/common';
import { CvLogService } from './cv-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('cv-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CvLogController {
  constructor(private readonly cvLogService: CvLogService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.cvLogService.findAll();
  }

  @Get('mine')
  findMine(@CurrentUser() user: User) {
    return this.cvLogService.findByUser(user.id);
  }
}