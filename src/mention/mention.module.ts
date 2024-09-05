import { Module } from '@nestjs/common';
import { MentionService } from './mention.service';
import { MentionController } from './mention.controller';

@Module({
  providers: [MentionService],
  controllers: [MentionController]
})
export class MentionModule {}
