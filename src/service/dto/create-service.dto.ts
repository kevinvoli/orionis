import { IsNotEmpty, IsString } from "class-validator";

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

  status: Status

  @IsNotEmpty()
  departement : string
}
