import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from 'src/departement/entities/departement.entity';
import { Service } from './entities/service.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Departement,
      Service
    ])
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
