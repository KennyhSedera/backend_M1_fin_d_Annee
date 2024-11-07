import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EncadrementSoutenanceService } from './encadrement-soutenance.service';
import { EncadrementSoutenanceController } from './encadrement-soutenance.controller';

@Module({
  imports: [PrismaModule],
  providers: [EncadrementSoutenanceService],
  controllers: [EncadrementSoutenanceController],
  exports: [EncadrementSoutenanceService],
})
export class EncadrementSoutenanceModule {}
