import { Module } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { EnseignantController } from './enseignant.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EnseignantService],
  controllers: [EnseignantController],
  exports: [EnseignantService],
})
export class EnseignantModule {}
