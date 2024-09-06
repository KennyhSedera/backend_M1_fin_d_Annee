import { Module } from '@nestjs/common';
import { MentionService } from './mention.service';
import { MentionController } from './mention.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MentionService],
  exports: [MentionService],
  controllers: [MentionController],
})
export class MentionModule {}
