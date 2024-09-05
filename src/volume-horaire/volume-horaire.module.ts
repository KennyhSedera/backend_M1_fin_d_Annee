import { Module } from '@nestjs/common';
import { VolumeHoraireService } from './volume-horaire.service';
import { VolumeHoraireController } from './volume-horaire.controller';

@Module({
  providers: [VolumeHoraireService],
  controllers: [VolumeHoraireController]
})
export class VolumeHoraireModule {}
