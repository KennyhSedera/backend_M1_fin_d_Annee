import { Module } from '@nestjs/common';
import { ParcoursNiveauService } from './parcours-niveau.service';
import { ParcoursNiveauController } from './parcours-niveau.controller';

@Module({
  providers: [ParcoursNiveauService],
  controllers: [ParcoursNiveauController]
})
export class ParcoursNiveauModule {}
