import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Direction } from '../../direction/entities/direction.entity';
import { Status } from '../../colaborateur/dto/create-colaborateur.dto';

export class CreateDepartementDto {
  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsString()
  description: string|null;

  @IsNotEmpty()
  direction: string;
  

  @IsOptional()
  @IsString()
  status: Status|null;

}
