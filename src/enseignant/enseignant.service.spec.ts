import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantService } from './enseignant.service';

describe('EnseignantService', () => {
  let service: EnseignantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnseignantService],
    }).compile();

    service = module.get<EnseignantService>(EnseignantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
