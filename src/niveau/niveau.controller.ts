import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NiveauService } from './niveau.service';
import { Prisma } from '@prisma/client';

@Controller('niveau')
export class NiveauController {
  constructor(private readonly service: NiveauService) {}

  @Post()
  create(@Body() data: Prisma.NiveauCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.NiveauUpdateInput) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
