import { Module } from '@nestjs/common';
import { HeuresComplementaireService } from './heures-complementaire.service';
import { HeuresComplementaireController } from './heures-complementaire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HeuresComplementaireService],
  exports: [HeuresComplementaireService],
  controllers: [HeuresComplementaireController],
})
export class HeuresComplementaireModule {}
