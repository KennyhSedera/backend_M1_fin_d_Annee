import { Test, TestingModule } from '@nestjs/testing';
import { ParcoursService } from './parcours.service';

describe('ParcoursService', () => {
  let service: ParcoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcoursService],
    }).compile();

    service = module.get<ParcoursService>(ParcoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
