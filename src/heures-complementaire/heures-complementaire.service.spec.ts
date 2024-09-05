import { Test, TestingModule } from '@nestjs/testing';
import { HeuresComplementaireService } from './heures-complementaire.service';

describe('HeuresComplementaireService', () => {
  let service: HeuresComplementaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeuresComplementaireService],
    }).compile();

    service = module.get<HeuresComplementaireService>(HeuresComplementaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
