import { Module } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { ParcoursController } from './parcours.controller';

@Module({
  providers: [ParcoursService],
  controllers: [ParcoursController]
})
export class ParcoursModule {}
