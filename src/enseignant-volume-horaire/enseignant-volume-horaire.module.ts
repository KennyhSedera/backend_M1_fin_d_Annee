import { Module } from '@nestjs/common';
import { EnseignantVolumeHoraireService } from './enseignant-volume-horaire.service';
import { EnseignantVolumeHoraireController } from './enseignant-volume-horaire.controller';

@Module({
  providers: [EnseignantVolumeHoraireService],
  controllers: [EnseignantVolumeHoraireController]
})
export class EnseignantVolumeHoraireModule {}
