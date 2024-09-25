import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UniteEnseignementService } from './unite-enseignement.service';
import { Prisma } from '@prisma/client';

@Controller('unite-enseignement')
export class UniteEnseignementController {
  constructor(private readonly service: UniteEnseignementService) {}

  @Post()
  create(@Body() data: Prisma.UniteEnseignementCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get(':parcours')
  findAllByParcours(@Param('parcours') parcours: string) {
    return this.service.findAllByParcours(parcours);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.UniteEnseignementUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
