import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EncadrementSoutenanceService } from './encadrement-soutenance.service';
import { Prisma } from '@prisma/client';

@Controller('heures-complementaire')
export class EncadrementSoutenanceController {
  constructor(private readonly service: EncadrementSoutenanceService) {}

  @Post()
  create(@Body() data: Prisma.EncadrementSoutenanceCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAllGroupByEns();
  }

  @Get('ens')
  findAllEnsEncSout() {
    return this.service.findAllEnsEncSout();
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