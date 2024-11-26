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

  @Get('/count')
  count() {
    return this.service.countAll();
  }

  @Get('all/:parcours')
  findAllByParcoursEns(@Param('parcours') parcours: string) {
    return this.service.findAllByParcoursEns(parcours);
  }

  @Get(':parcours')
  findAllParcours(@Param('parcours') parcours: string) {
    return this.service.findAllParcours(parcours);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.VolumeHoraireUncheckedUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
