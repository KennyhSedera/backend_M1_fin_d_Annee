import { Module } from '@nestjs/common';
import { VolumeHoraireService } from './volume-horaire.service';
import { VolumeHoraireController } from './volume-horaire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VolumeHoraireService],
  controllers: [VolumeHoraireController],
  exports: [VolumeHoraireService],
})
export class VolumeHoraireModule {}
