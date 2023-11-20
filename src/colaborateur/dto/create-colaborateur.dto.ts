import { IntegerType } from 'typeorm';
import { IsArray, IsBoolean, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { CreateLinkDto } from 'src/link/dto/create-link.dto';

export enum Status {
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}
export class CreateColaborateurDto {

  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsNotEmpty()
  @IsString()
  prenoms:string;

  @IsOptional()
  @IsString()
  status: Status|null;

  @IsOptional()
  @IsString()
  biographie: string|null;

  // @IsNotEmpty()
  @IsOptional()
  telephone_fixe:string | null;

  // @IsNotEmpty()
  @IsOptional()
  telephone_portable: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  grade:string

  @IsOptional()
  sexe:string

  @IsNotEmpty()
  poste: number;

  @IsNotEmpty()
  service:string;
 
  @IsOptional()
  instagrammeLink: string | null;

  @IsOptional()
  linkedinLink: string | null;
  @IsOptional()
  photo:string

}
