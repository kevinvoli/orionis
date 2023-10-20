import { IsNotEmpty, IsString, Length } from 'class-validator';

export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

export class CreatePosteDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  
  status: Status;

  @IsString()
  description:string|null

}
