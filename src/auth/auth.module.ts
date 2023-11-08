// import {  Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt/dist';
// import { JwtStrategy } from './strategys/jwt.strategy';
// import { ConfigService } from '@nestjs/config';
// import { Token } from './entities/token.entity';
// import { JwtRefreshStrategy } from './strategys/jwt-refresh-strategy';
// import { Repository } from 'typeorm';
// import { TokenService } from './jwt.service';
// import { GoogleStrategy } from './strategys/google.strategy';
// import { FacebookStrategy } from './strategys/facebook.strategy';
// import { AdminController } from 'src/admin/admin.controller';
// import { Admin } from 'src/admin/entities/admin.entity';
// import { AdminModule } from 'src/admin/admin.module';
// import { AdminService } from 'src/admin/admin.service';
// import { Roles } from 'src/admin/entities/role.entity';

// @Module({
//   imports: [
//     AdminModule,
//     TypeOrmModule.forFeature([
//       Admin,
//       Roles,
//       Token]),
//     PassportModule.register({
//       defaultStrategy: 'jwt',
//     }),
//     JwtModule.register({
//       secret: process.env.SECRET,
//       signOptions: {
//         expiresIn: 3600
//       }
//     })
//   ],
//   controllers: [
//     AuthController,
//     AdminController
//   ],
//   providers: [
//     AuthService,
//     AdminService,
//     TokenService,
//     Repository,   
//     JwtService,
//     JwtStrategy,
//     ConfigService,
//     JwtRefreshStrategy,
//     GoogleStrategy,
//     FacebookStrategy,
//   ],

// })
// export class AuthModule {}
