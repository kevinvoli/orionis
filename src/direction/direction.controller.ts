import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { UpdateColaborateurDto } from 'src/colaborateur/dto/update-colaborateur.dto';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionService.create(createDirectionDto);
    
  }

  @Get()
  findAll() {
    return this.directionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("mes truc",id);
    
    return this.directionService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDirectionDto:UpdateDirectionDto) {
    console.log("mes lod status",updateDirectionDto , id );
    
    return await this.directionService.update(+id, updateDirectionDto);
    // return "cool"
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.directionService.remove(+id);
  }
}
