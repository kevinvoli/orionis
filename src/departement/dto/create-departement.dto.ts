import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Direction } from '../../direction/entities/direction.entity';

export class CreateDepartementDto {
  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsString()
  description: string|null;

  @IsNotEmpty()
  direction: string
}
