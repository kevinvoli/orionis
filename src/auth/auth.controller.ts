// import { Controller,
//   Get, 
//   Post, 
//   Body, 
//   Patch, 
//   Param, 
//   Delete, 
//   Logger, 
//   UseGuards, 
//   Request, 
//   UseInterceptors, 
//   ClassSerializerInterceptor, 
//   HttpStatus, 
//   Req, 
//   Res, 
//   Options 
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// // import { CreateUserDto } from '../user/dto/create-user.dto';
// // import { LoginUserDto } from 'src/user/dto/ligin-user.dto';

// import { User } from '../user/entities/user.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { PickType } from '@nestjs/mapped-types';
// import { Response } from 'express';
// import { NotFoundException } from '@nestjs/common';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { UpdateUserDto } from 'src/user/dto/update-user.dto';
// import { CreateResetePasswordDto } from './dto/create-resete-pasword.dto';
// import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

// @Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
// export class AuthController {

//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() createAuthDto: CreateAdminDto, idRole:number=1) {
//     console.log('moi aaussi',createAuthDto);
    
//     const users= await this.authService.create(createAuthDto, idRole);
//     return users
//   }
//   // @UseGuards(AuthGuard)
//   @Post('login')

//   async login(@Body() loginUserDto: LoginUserDto , @Request() req, @Res({passthrough:true})response: Response) {
//     console.log(loginUserDto); 
//     const token= await this.authService.login(loginUserDto)
//     response.cookie('jwt',token,{httpOnly:true})
//     return { token: token}
//   }

//   @Get("/facebook")
//   @UseGuards(AuthGuard("facebook"))
//   async facebookLogin(): Promise<any> {
//     console.log("req facebook simple:");
//     return HttpStatus.OK;
//   }
//   @Get("/facebook/redirect")
//   @UseGuards(AuthGuard("facebook"))
//   async facebookLoginRedirect(@Req() req): Promise<any> {
//     console.log("req facebook:",req);
//     return {
//       statusCode: HttpStatus.OK,
//       data: req.user,
//     };
//   }

//   @Get('/google')
//   @UseGuards(AuthGuard('google'))
//    async googleAuth(@Req()req) {
//     console.log('google',req);
//     // return this.usersService.findAll();
//   }

//   @Get('/google/callback')
//   @UseGuards(AuthGuard('google'))
//  async googleAuthRedirect(@Req()req) {
//   try {
//     const user = await this.authService.googleLogin(req);
//     return user
//   } catch (error) {
//     throw new NotFoundException(error)
//   }
//   }

//   @Post('/google/register')

//   async registergoogle(@Body() createAuthDto: CreateAdminDto, idRole:number) {
//     // createAuthDto.typeConnection= 'google'
//     const users= await this.authService.create(createAuthDto, idRole);
//     return users
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @UseGuards(JwtAuthGuard)
//   @Post('logout')
//   async logout(@Request()req, @Res({passthrough:true}) respons:Response){
//     respons.clearCookie('jwt')
//     console.log("cococococococococococococococococococococo");
    
//     const result= await this.authService.localLogout(req.user)
//     console.log("cococococococococococococococococococococo", result);

//     return result
//   }


//   @Get('confirmation/:token')
//   async  mailconfirmation(@Param('token')token:string){
//     console.log(token);
//     const confirmation = await this.authService.mailConfirmation(token)
//     console.log(confirmation);
//     return 'succes to register'
//   }

//   @Post('resete-password')
//   async resetePassword(@Body()user:UpdateUserDto, @Res({passthrough:true}) respons:Response){
//     respons.clearCookie('jwt')
//     console.log("cococococococococococococococococococococo");
    
//     const result= await this.authService.resetPasswordDemand(user.email)
//     console.log("cococococococococococococococococococococo", result);

//     return result
//   }

//   @Post('reset-password-confirmation')
//   async resetePasswordConfirm(@Body()code:CreateResetePasswordDto, @Res({passthrough:true}) respons:Response){
//     respons.clearCookie('jwt')
//     console.log("cococococococococococococococococococococo");
    
//     const result= await this.authService.resetPasswordComfirmation(code)
//     console.log("cococococococococococococococococococococo", result);

//     return result
//   }
// }