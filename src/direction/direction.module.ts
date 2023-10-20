import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { Departement } from 'src/departement/entities/departement.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Direction,Departement
    ])
  ],
  controllers: [DirectionController],
  providers: [DirectionService]
})
export class DirectionModule {}
