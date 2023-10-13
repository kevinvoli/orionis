import { Test, TestingModule } from '@nestjs/testing';
import { ColaborateurController } from './colaborateur.controller';
import { ColaborateurService } from './colaborateur.service';

describe('ColaborateurController', () => {
  let controller: ColaborateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaborateurController],
      providers: [ColaborateurService],
    }).compile();

    controller = module.get<ColaborateurController>(ColaborateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
