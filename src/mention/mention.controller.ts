import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MentionService } from './mention.service';
import { Prisma } from '@prisma/client';

@Controller('mention')
export class MentionController {
  constructor(private readonly service: MentionService) {}

  @Post()
  create(@Body() data: Prisma.MentionCreateInput) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, data: Prisma.MentionUpdateInput) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
