import { IntegerType } from 'typeorm';
import { IsArray, IsBoolean, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateResponsableDirectionDto {
  
  @IsNotEmpty()
  direction:string
  
  @IsNotEmpty()
  collaborateur: string
}


