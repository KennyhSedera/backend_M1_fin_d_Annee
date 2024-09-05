import { Module } from '@nestjs/common';
import { UniteEnseignementService } from './unite-enseignement.service';
import { UniteEnseignementController } from './unite-enseignement.controller';

@Module({
  providers: [UniteEnseignementService],
  controllers: [UniteEnseignementController]
})
export class UniteEnseignementModule {}
