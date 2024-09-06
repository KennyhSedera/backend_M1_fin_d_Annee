import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { Prisma } from '@prisma/client';

@Controller('grade')
export class GradeController {
  constructor(private readonly service: GradeService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Prisma.GradeCreateInput) {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    data: Prisma.GradeUpdateInput,
  ) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
