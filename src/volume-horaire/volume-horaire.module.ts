import { Module } from '@nestjs/common';
import { VolumeHoraireService } from './volume-horaire.service';
import { VolumeHoraireController } from './volume-horaire.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [VolumeHoraireService],
  controllers: [VolumeHoraireController],
  exports: [VolumeHoraireService],
})
export class VolumeHoraireModule {}
