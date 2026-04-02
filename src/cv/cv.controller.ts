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
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserService } from '../user/user.service';

@Controller('cvs')
export class CvController {
  constructor(
    private readonly cvService: CvService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto, @Req() req: any) {
    const user = await this.userService.findOne(req.userId);
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    return this.cvService.create(createCvDto, user);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
    @Req() req: any,
  ) {
    const cv = await this.cvService.findOne(id);
    if (cv.user.id !== req.userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres CVs',
      );
    }
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const cv = await this.cvService.findOne(id);
    if (cv.user.id !== req.userId) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres CVs',
      );
    }
    return this.cvService.remove(id);
  }
}
