import { Module } from '@nestjs/common';
import { ColaborateurService } from './colaborateur.service';
import { ColaborateurController } from './colaborateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborateur } from './entities/colaborateur.entity';
import { Poste } from 'src/poste/entities/poste.entity';
import { PosteService } from 'src/poste/poste.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Colaborateur,
      Poste,
    ])
  ],
  controllers: [ColaborateurController],
  providers: [ColaborateurService]
})
export class ColaborateurModule {}