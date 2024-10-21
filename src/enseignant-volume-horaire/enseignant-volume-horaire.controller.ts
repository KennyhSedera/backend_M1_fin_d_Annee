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
import { parcoursNiveauDto } from './parcoursNiveauDto';

@Controller('enseignant-volume-horaire')
export class EnseignantVolumeHoraireController {
  constructor(private readonly service: EnseignantVolumeHoraireService) {}

  @Get(':type')
  findAllEns(@Param('type') type: string) {
    return this.service.findAll(type);
  }

  @Get('ens/:id')
  findOneEns(@Param('id') id: string) {
    return this.service.findOneEns(+id);
  }

  @Post('ec')
  findAllEC(@Body() data: parcoursNiveauDto) {
    return this.service.findAllEC(data);
  }

  @Post('ens')
  findAllGrByEns(@Body() data: parcoursNiveauDto) {
    return this.service.getTeachingData(data);
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
