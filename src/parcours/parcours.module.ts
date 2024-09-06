import { Module } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { ParcoursController } from './parcours.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ParcoursService],
  exports: [ParcoursService],
  controllers: [ParcoursController],
})
export class ParcoursModule {}
