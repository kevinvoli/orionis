import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadInterface } from "../interface/payload.interface";
import { AdminService } from "src/admin/admin.service";
// import { TokenService } from "../jwt.service";
// import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private jwtService: TokenService,
        private userService: AdminService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET'),
        });
    }

    async validate(payload: PayloadInterface) {
        const user = await this.userService.findOne(payload.id)
        console.log("le User",user);
        if (!user)  throw new UnauthorizedException() 
        return user
             
    }
}