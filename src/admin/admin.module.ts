import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { Roles } from './entities/role.entity';
import { Permissions } from './entities/permissions.entity';
import { Objects } from './entities/objects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[
    TypeOrmModule.forFeature([Admin, Roles,Permissions,Objects]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
