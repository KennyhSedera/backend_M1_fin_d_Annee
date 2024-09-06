import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VolumeHoraireService } from './volume-horaire.service';
import { Prisma } from '@prisma/client';

@Controller('volume-horaire')
export class VolumeHoraireController {
  constructor(private readonly service: VolumeHoraireService) {}
  @Post()
  create(@Body() data: Prisma.VolumeHoraireCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.VolumeHoraireUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
