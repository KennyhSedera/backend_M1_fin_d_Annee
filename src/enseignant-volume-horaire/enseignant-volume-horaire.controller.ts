import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnseignantVolumeHoraireService } from './enseignant-volume-horaire.service';
import { Prisma } from '@prisma/client';

@Controller('enseignant-volume-horaire')
export class EnseignantVolumeHoraireController {
  constructor(private readonly service: EnseignantVolumeHoraireService) {}

  @Get()
  findAllEns() {
    return this.service.findAll();
  }

  @Get('ens/:id')
  findOneEns(@Param('id') id: string) {
    return this.service.findOneEns(+id);
  }

  @Post()
  create(@Body() data: Prisma.EnseignantVolumeHoraireUncheckedCreateInput) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
