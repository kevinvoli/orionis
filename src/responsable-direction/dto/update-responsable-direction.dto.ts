import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsableDirectionDto } from './create-responsable-direction.dto';

export class UpdateResponsableDirectionDto extends PartialType(CreateResponsableDirectionDto) {}
