import { Test, TestingModule } from '@nestjs/testing';
import { ColaborateurService } from './colaborateur.service';

describe('ColaborateurService', () => {
  let service: ColaborateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColaborateurService],
    }).compile();

    service = module.get<ColaborateurService>(ColaborateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
