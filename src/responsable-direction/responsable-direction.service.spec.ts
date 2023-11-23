import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableDirectionService } from './responsable-direction.service';

describe('ResponsableDirectionService', () => {
  let service: ResponsableDirectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsableDirectionService],
    }).compile();

    service = module.get<ResponsableDirectionService>(ResponsableDirectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
