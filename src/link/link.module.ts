import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Link,
      Colaborateur
    ])
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
