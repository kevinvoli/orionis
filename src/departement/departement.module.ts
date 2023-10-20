import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from './entities/departement.entity';
import { Direction } from 'src/direction/entities/direction.entity';
import { Service } from 'src/service/entities/service.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Departement,
      Direction,Service

    ])
  ],
  controllers: [DepartementController],
  providers: [DepartementService]
})
export class DepartementModule {}
