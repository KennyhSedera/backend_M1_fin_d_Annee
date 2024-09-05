import { Test, TestingModule } from '@nestjs/testing';
import { MentionController } from './mention.controller';

describe('MentionController', () => {
  let controller: MentionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentionController],
    }).compile();

    controller = module.get<MentionController>(MentionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
