import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParcoursNiveauService } from './parcours-niveau.service';
import { Prisma } from '@prisma/client';

@Controller('parcours-niveau')
export class ParcoursNiveauController {
  constructor(private readonly service: ParcoursNiveauService) {}

  @Post()
  create(@Body() data: Prisma.ParcoursNiveauCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  updatre(
    @Param('id') id: string,
    @Body() data: Prisma.ParcoursNiveauUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
