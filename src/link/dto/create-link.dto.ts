import { IsOptional, IsString } from "class-validator";
import { Status } from "../entities/link.entity";

export class CreateLinkDto {

  name: string;
  link: string;
  icon: string;

  @IsOptional()
  @IsString()
  status: Status|null;
}
