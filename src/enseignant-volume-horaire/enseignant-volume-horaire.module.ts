import { Module } from '@nestjs/common';
import { EnseignantVolumeHoraireService } from './enseignant-volume-horaire.service';
import { EnseignantVolumeHoraireController } from './enseignant-volume-horaire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EnseignantVolumeHoraireService],
  controllers: [EnseignantVolumeHoraireController],
  exports: [EnseignantVolumeHoraireService],
})
export class EnseignantVolumeHoraireModule {}
