import { Module } from '@nestjs/common';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EnseignantController],
  providers: [EnseignantService]
})
export class EnseignantModule {}
