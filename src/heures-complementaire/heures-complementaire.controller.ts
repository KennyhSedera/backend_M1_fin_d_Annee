import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HeuresComplementaireService } from './heures-complementaire.service';
import { Prisma } from '@prisma/client';

@Controller('heures-complementaire')
export class HeuresComplementaireController {
  constructor(private readonly service: HeuresComplementaireService) {}

  @Post()
  create(@Body() data: Prisma.HeuresComplementaireCreateInput) {
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
    @Body() data: Prisma.HeuresComplementaireUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
