import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

export class CreatePosteDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  
  @IsOptional()
  @IsString()
  status: Status|null;

  @IsString()
  description:string|null

}
