import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';

@Controller('enseignant')
export class EnseignantController {
  constructor(private readonly service: EnseignantService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/enseignant',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + file.originalname.replace(/\.[^/.]+$/, '');
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 7 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  create(
    @Body() data: Prisma.EnseignantUncheckedCreateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.gradeId = Number(data.gradeId);
    data.Oblig = data.Oblig ? Number(data.Oblig) : null;
    if (file) {
      data.ensPhoto = 'enseignant/' + file.filename;
    } else {
      data.ensPhoto = '';
    }
    return this.service.create(data);
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }

  @Get('/decompteTheo')
  findAllDecomptTheo() {
    return this.service.findAllDecomptTheo();
  }

  @Get('/decomptePra')
  findAllDecomptPra() {
    return this.service.findAllDecomptPra();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EnseignantUpdateInput) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
