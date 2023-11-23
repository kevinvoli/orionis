import { Module } from '@nestjs/common';
import { ResponsableDirectionService } from './responsable-direction.service';
import { ResponsableDirectionController } from './responsable-direction.controller';
import { ResponsableDirection } from './entities/responsable-direction.entity';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';
import { Direction } from 'src/direction/entities/direction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ResponsableDirection,
      Colaborateur,
      Direction
    ])
  ],
  controllers: [ResponsableDirectionController],
  providers: [ResponsableDirectionService]
})
export class ResponsableDirectionModule {


}
