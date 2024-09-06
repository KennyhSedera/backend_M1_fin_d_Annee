import { Module } from '@nestjs/common';
import { UniteEnseignementService } from './unite-enseignement.service';
import { UniteEnseignementController } from './unite-enseignement.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UniteEnseignementService],
  exports: [UniteEnseignementService],
  controllers: [UniteEnseignementController],
})
export class UniteEnseignementModule {}
