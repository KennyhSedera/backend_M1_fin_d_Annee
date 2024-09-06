import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { Prisma } from '@prisma/client';

@Controller('parcours')
export class ParcoursController {
  constructor(private readonly service: ParcoursService) {}

  @Post()
  create(@Body() data: Prisma.ParcoursCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ParcoursUpdateInput) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
