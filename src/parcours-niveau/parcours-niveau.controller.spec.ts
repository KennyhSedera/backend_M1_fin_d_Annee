import { Test, TestingModule } from '@nestjs/testing';
import { ParcoursNiveauController } from './parcours-niveau.controller';

describe('ParcoursNiveauController', () => {
  let controller: ParcoursNiveauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcoursNiveauController],
    }).compile();

    controller = module.get<ParcoursNiveauController>(ParcoursNiveauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
