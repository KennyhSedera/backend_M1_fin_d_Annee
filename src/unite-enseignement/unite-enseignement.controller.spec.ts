import { Test, TestingModule } from '@nestjs/testing';
import { UniteEnseignementController } from './unite-enseignement.controller';

describe('UniteEnseignementController', () => {
  let controller: UniteEnseignementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniteEnseignementController],
    }).compile();

    controller = module.get<UniteEnseignementController>(
      UniteEnseignementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
