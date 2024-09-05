import { Module } from '@nestjs/common';
import { HeuresComplementaireService } from './heures-complementaire.service';
import { HeuresComplementaireController } from './heures-complementaire.controller';

@Module({
  providers: [HeuresComplementaireService],
  controllers: [HeuresComplementaireController]
})
export class HeuresComplementaireModule {}
