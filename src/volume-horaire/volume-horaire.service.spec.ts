import { Test, TestingModule } from '@nestjs/testing';
import { VolumeHoraireService } from './volume-horaire.service';

describe('VolumeHoraireService', () => {
  let service: VolumeHoraireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolumeHoraireService],
    }).compile();

    service = module.get<VolumeHoraireService>(VolumeHoraireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
