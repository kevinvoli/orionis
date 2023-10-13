import { IntegerType } from 'typeorm';
import { Status } from '../../poste/entities/poste.entity';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateColaborateurDto {

  @IsNotEmpty()
  @IsString()
  name:string;


  @IsNotEmpty()
  @IsString()
  prenoms:string;


  @IsBoolean()
  Status: string|null;


  @IsInt({message:"un nombre entier obligatoire"})
  contacts_flotte:string | null;

  @IsNotEmpty()
  @IsInt()
  contacts_perso: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsInt()
  @IsNotEmpty()
  poste: number;
}
