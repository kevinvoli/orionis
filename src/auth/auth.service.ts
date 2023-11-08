// import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UserService } from '../user/user.service';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import * as bcrypt from 'bcrypt';
// import { LoginUserDto } from '../user/dto/ligin-user.dto';
// import { Token } from './entities/token.entity';
// import { TokenService } from './jwt.service';
// import { MailService } from '../mail/mail.service';
// import { User } from 'src/user/entities/user.entity';
// import * as speakeasy from 'speakeasy'
// import { ConfigService } from '@nestjs/config';
// import { CreateResetePasswordDto } from './dto/create-resete-pasword.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private tokenService : TokenService,
//     private mailService: MailService,
//     private configService: ConfigService,
//   ) {}

//   async googleLogin(req){
//     try {
//       if(!req.user){
//         return 'No user from google'
//       }
//       return {
//         message: 'user info form Google ',
//         user:req.user
//       }
//     } catch (error) {
//       throw new NotFoundException(error)
//     }
//   }

//   async create(createUserDto: CreateUserDto, idRole:number) {
//     const {email, password,name} = createUserDto
//     try {
//       const valid = await this.userService.findOneByEmail(email)
//       if(valid)throw new NotFoundException("email exiting in database")
//       const token = await this.tokenService.confirmationToken(createUserDto)
//       const user = await this.mailService.confirmationMail(token, {email:email, user:name})
//       console.log("le email",user);   
//       return 'success'
//     } catch (error) {
//       throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)

//       // throw new NotFoundException(error)
//     }
   
//   }
//   async validateUser(authDto: CreateAuthDto) {
//     const {mail, password} = authDto

//     try {
//       const user = await this.userService.auth(mail)
//     if (user && user.validatePassword(password,user.password)) {
      
//       return user
//     }
//     return null
//     } catch (error) {
//       throw new NotAcceptableException(error)
//     } 
//   }
//   async login(loginUserDto: LoginUserDto) {
//     console.log(loginUserDto)
//     const payload = await this.userService.login(loginUserDto)
//     console.log("payload",payload);
    
//     if (!payload) {
//         throw new UnauthorizedException('Invalid credentials')
//     }
//     // const tokens = await this.tokenService.findOne(payload.id)
//     // console.log("ododododododododo",tokens);
//     const newToken = new Token()
//     const accessToken =await this.tokenService.getAccessToken(payload)
//     const refreshToken = await this.tokenService.getRefreshToken(payload)
//     newToken.accessToken= accessToken
//     newToken.refreshToken= refreshToken
//     newToken.userId = payload.id
//     const refresh= await this.tokenService.updateRefreshTokenInUser(newToken, payload.id)
//     console.log("les  token:",refresh);
    
//     return refresh
//   }
//   async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
//     const user = await this.userService.findOneByEmail(username)
//     const isRefreshTokenMatching = await bcrypt.compare(
//       refreshToken,"11"
//       // user.hashedRefreshToken
//     );
 
//     if (isRefreshTokenMatching) {
//         await this.tokenService.updateRefreshTokenInUser(null, username)
//       return user;
//     } else {
//         throw new UnauthorizedException()
//     }
//   }

//   async mailConfirmation(token:string){
//   try {
//     const user =  await this.tokenService.verifyToken(token)
//   await this.userService.create(user)
//   return user
//   } catch (error) {
//     throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
//   }
//   }

//   async localLogout(userId: User): Promise<User> {
//   try {


//     const user = await this.userService.findOne(userId.id);

//   const token  = await this.tokenService.findOne(userId.id)
  
//   // if (!token) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
//   token.refreshToken = 'null';
//   token.accessToken= 'null';

//   await this.tokenService.delete(token);
//   console.log("le token est ici",userId);
//   return user
//   } catch (error) {
//     throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
//   }
  
//   }

//   async resetPasswordDemand( userMail: string){

//   try {
//   const users = await this.userService.findOneByEmail(userMail)
//   const code = speakeasy.totp({
//     secret: this.configService.get('RESETE_PASSWORD_CODE'),
//     digits:5,
//     step: 60*15,
//     encoding:'base32'
//   })

//   await this.mailService.refraishPasswordGet(code, users.email)
//   return 'send mail for change password'
//   } catch (error) {
//     throw new NotFoundException('user not found')
//   }
//   }

//   async resetPasswordComfirmation(resetePasswordDto:CreateResetePasswordDto){
//     const user = await this.userService.findOneByEmail(resetePasswordDto.email)
//     if(!user)throw new NotAcceptableException('User not fund')
//     const match =  speakeasy.totp.verify({
//       secret: this.configService.get('RESETE_PASSWORD_CODE'),
//       token:resetePasswordDto.code,
//       digits:5,
//       step: 60*15,
//       encoding:'base32'
//     })
//     if(!match) throw new UnauthorizedException('Invalid/expired token')
//     try {
//       const hashpass= await user.passwordHash(resetePasswordDto.password)
      
//       await this.userService.update(user.id,{password:hashpass})
//       return  {data:"updated success"}
//     } catch (error) {
//       throw new HttpException(error,HttpStatus.NOT_FOUND)
//     }
//   }


// }