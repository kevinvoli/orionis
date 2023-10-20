import { Module } from '@nestjs/common';
import { PosteService } from './poste.service';
import { PosteController } from './poste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poste } from './entities/poste.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { Service } from 'src/service/entities/service.entity';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Poste,
      Colaborateur
    ])
  ],
  controllers: [PosteController],
  providers: [PosteService]
})
export class PosteModule {}
