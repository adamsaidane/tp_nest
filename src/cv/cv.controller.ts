import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('cvs')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createCvDto: CreateCvDto, @CurrentUser() user: User) {
    return this.cvService.create(createCvDto, user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@CurrentUser() user: User) {
    return this.cvService.findAll(user);
  }

  @Get('view/:id')
  @ApiBearerAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
    @CurrentUser() user: User,
  ) {
    const cv = await this.cvService.findOne(id);

    if (user.role !== 'admin' && cv.user.id !== user.id) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres CVs',
      );
    }
    return this.cvService.update(id, updateCvDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.remove(id);
  }
}
