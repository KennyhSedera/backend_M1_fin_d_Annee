import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantVolumeHoraireService } from './enseignant-volume-horaire.service';

describe('EnseignantVolumeHoraireService', () => {
  let service: EnseignantVolumeHoraireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnseignantVolumeHoraireService],
    }).compile();

    service = module.get<EnseignantVolumeHoraireService>(EnseignantVolumeHoraireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
