import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

export class CreateServiceDto {

  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsString()
  description: string|null;

  @IsOptional()
  @IsString()
  status: Status|null;

  @IsNotEmpty()
  departement : string
}
