import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantController } from './enseignant.controller';

describe('EnseignantController', () => {
  let controller: EnseignantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignantController],
    }).compile();

    controller = module.get<EnseignantController>(EnseignantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
