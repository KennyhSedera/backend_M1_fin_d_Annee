import { Test, TestingModule } from '@nestjs/testing';
import { VolumeHoraireController } from './volume-horaire.controller';

describe('VolumeHoraireController', () => {
  let controller: VolumeHoraireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolumeHoraireController],
    }).compile();

    controller = module.get<VolumeHoraireController>(VolumeHoraireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
