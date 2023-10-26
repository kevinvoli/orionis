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


  Status: Status|null;


  @IsNotEmpty()
  telephone_fixe:string | null;

  @IsNotEmpty()
  telephone_portable: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  poste: number;

  @IsNotEmpty()
  service:string;
 
  @IsOptional()
  instagrammeLink: string | null;

  @IsOptional()
  linkedinLink: string | null;

  @IsArray()
  @IsOptional()
  @IsString()
  link : CreateLinkDto[]
}
