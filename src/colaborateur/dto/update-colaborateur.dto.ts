import { PartialType } from '@nestjs/mapped-types';
import { CreateColaborateurDto } from './create-colaborateur.dto';

export class UpdateColaborateurDto extends PartialType(CreateColaborateurDto) {}
