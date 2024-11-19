import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { EncadrementSoutenanceService } from './encadrement-soutenance.service';
import { Prisma } from '@prisma/client';
import { parcoursNiveauDto } from '../enseignant-volume-horaire/parcoursNiveauDto';

@Controller('encadrement-soutenance')
export class EncadrementSoutenanceController {
  constructor(private readonly service: EncadrementSoutenanceService) {}

  @Post()
  create(@Body() data: Prisma.EncadrementSoutenanceUncheckedCreateInput) {
    return this.service.create(data);
  }

  @Post('ens')
  findAll(@Body() parcours: parcoursNiveauDto) {
    return this.service.findAllGroupByEns(parcours);
  }

  @Post('all')
  findAllEnsEncSout(@Body() parcours: parcoursNiveauDto) {
    return this.service.findAllEnsEncSout(parcours);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.EncadrementSoutenanceUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
