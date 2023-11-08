import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PosteModule } from './poste/poste.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ColaborateurModule } from './colaborateur/colaborateur.module';
import { MediaModule } from './media/media.module';
import { DepartementModule } from './departement/departement.module';
import { DirectionModule } from './direction/direction.module';
import { ServiceModule } from './service/service.module';
import { LinkModule } from './link/link.module';
import { AdminModule } from './admin/admin.module';
// import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi'

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      MYSQL_HOST:Joi.string().required(),
      MYSQL_PORT:Joi.number().required(),
      MYSQL_USER:Joi.string().required(),
      MYSQL_PASSWORD: '',
      MYSQL_DATABASE:Joi.string().required(),
    })
  }),
    PosteModule, DatabaseModule, ColaborateurModule, MediaModule, DepartementModule, DirectionModule, ServiceModule, LinkModule, AdminModule, 
    // AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
