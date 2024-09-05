import { Test, TestingModule } from '@nestjs/testing';
import { ParcoursNiveauService } from './parcours-niveau.service';

describe('ParcoursNiveauService', () => {
  let service: ParcoursNiveauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcoursNiveauService],
    }).compile();

    service = module.get<ParcoursNiveauService>(ParcoursNiveauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
