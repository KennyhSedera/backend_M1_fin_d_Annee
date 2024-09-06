import { Module } from '@nestjs/common';
import { ParcoursNiveauService } from './parcours-niveau.service';
import { ParcoursNiveauController } from './parcours-niveau.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ParcoursNiveauService],
  exports: [ParcoursNiveauService],
  controllers: [ParcoursNiveauController],
})
export class ParcoursNiveauModule {}
