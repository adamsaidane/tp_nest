import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpStatus,
    HttpCode,
    Req
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {UserService} from "../user/user.service";

@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) {}

    @Post('create')
    create(@Body() createCvDto: CreateCvDto) {
        return this.cvService.create(createCvDto);
    }

    @Get('all')
    findAll() {
        return this.cvService.findAll();
    }

    @Get('view/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cvService.findOne(id);
    }

    @Patch('update/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCvDto: UpdateCvDto,
    ) {
        return this.cvService.update(id, updateCvDto);
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.cvService.remove(id);
    }
}
