import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ExtractJwt, Strategy } from "passport-jwt";
// import { User } from '../../user/entities/user.entity';
// import { AuthService } from "../auth.service";
import { PayloadInterface } from "../interface/payload.interface";
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from "src/admin/entities/admin.entity";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        @InjectRepository(Admin)
        private userRepository: Repository<Admin>,
        // private authService: AuthService,
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET')
        })
    }

    async validate(payload: PayloadInterface) {
        const user = await this.userRepository.findOne({
          where:{
            id:payload.id
          }
        })

        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}