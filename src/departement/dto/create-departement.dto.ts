import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDepartementDto {
  @IsNotEmpty()
  @IsString()
  name:string;

  @IsString()
  description: string|null;

}
