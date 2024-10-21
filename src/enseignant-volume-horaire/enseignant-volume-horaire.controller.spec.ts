import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantVolumeHoraireController } from './enseignant-volume-horaire.controller';

describe('EnseignantVolumeHoraireController', () => {
  let controller: EnseignantVolumeHoraireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignantVolumeHoraireController],
    }).compile();

    controller = module.get<EnseignantVolumeHoraireController>(
      EnseignantVolumeHoraireController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
