import { Test, TestingModule } from '@nestjs/testing';
import { ParcoursController } from './parcours.controller';

describe('ParcoursController', () => {
  let controller: ParcoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcoursController],
    }).compile();

    controller = module.get<ParcoursController>(ParcoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
