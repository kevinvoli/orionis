import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Status {
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

export class CreateDirectionDto {
  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsString()
  @IsOptional()
  description: string|null;

  @IsOptional()
  @IsString()
  status: Status|null;


}
