import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponsableDirectionService } from './responsable-direction.service';
import { CreateResponsableDirectionDto } from './dto/create-responsable-direction.dto';
import { UpdateResponsableDirectionDto } from './dto/update-responsable-direction.dto';

@Controller('responsable-direction')
export class ResponsableDirectionController {
  constructor(private readonly responsableDirectionService: ResponsableDirectionService) {}

  @Post()
  create(@Body() createResponsableDirectionDto: CreateResponsableDirectionDto) {
    return this.responsableDirectionService.create(createResponsableDirectionDto);
  }

  @Get()
  findAll() {
    return this.responsableDirectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsableDirectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsableDirectionDto: UpdateResponsableDirectionDto) {
    return this.responsableDirectionService.update(+id, updateResponsableDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsableDirectionService.remove(+id);
  }
}
