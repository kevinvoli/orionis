import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "src/poste/dto/create-poste.dto";

export class CreateAdminDto {

  @IsNotEmpty()
  @IsString()
  username:string;

  @IsOptional()
  @IsString()
  email: Status|null;

  @IsOptional()
  @IsString()
  password: string|null;

  @IsNotEmpty()
  @IsOptional()
  roles:string | null;

}