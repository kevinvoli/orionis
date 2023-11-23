import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableDirectionController } from './responsable-direction.controller';
import { ResponsableDirectionService } from './responsable-direction.service';

describe('ResponsableDirectionController', () => {
  let controller: ResponsableDirectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsableDirectionController],
      providers: [ResponsableDirectionService],
    }).compile();

    controller = module.get<ResponsableDirectionController>(ResponsableDirectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
