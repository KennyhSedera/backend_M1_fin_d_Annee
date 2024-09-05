import { Test, TestingModule } from '@nestjs/testing';
import { HeuresComplementaireController } from './heures-complementaire.controller';

describe('HeuresComplementaireController', () => {
  let controller: HeuresComplementaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeuresComplementaireController],
    }).compile();

    controller = module.get<HeuresComplementaireController>(HeuresComplementaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
