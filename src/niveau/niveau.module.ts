import { Module } from '@nestjs/common';
import { NiveauService } from './niveau.service';
import { NiveauController } from './niveau.controller';

@Module({
  providers: [NiveauService],
  controllers: [NiveauController]
})
export class NiveauModule {}
