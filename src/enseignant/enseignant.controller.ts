import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { Prisma } from '@prisma/client';

@Controller('enseignant')
export class EnseignantController {
  constructor(private readonly service: EnseignantService) {}

  @Post()
  create(@Body() data: Prisma.EnseignantUncheckedCreateInput) {
    return this.service.create(data);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EnseignantUpdateInput) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
