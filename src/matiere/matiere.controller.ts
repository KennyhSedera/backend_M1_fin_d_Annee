import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { Prisma } from '@prisma/client';

@Controller('matiere')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}

  @Post()
  create(@Body() createMatiereDto: Prisma.MatiereCreateInput) {
    return this.matiereService.create(createMatiereDto);
  }

  @Get()
  findAll() {
    return this.matiereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matiereService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatiereDto: Prisma.MatiereUpdateInput) {
    return this.matiereService.update(+id, updateMatiereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matiereService.remove(+id);
  }
}
