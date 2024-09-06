import { Module } from '@nestjs/common';
import { NiveauService } from './niveau.service';
import { NiveauController } from './niveau.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NiveauService],
  exports: [NiveauService],
  controllers: [NiveauController],
})
export class NiveauModule {}
