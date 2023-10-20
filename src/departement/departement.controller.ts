import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';

@Controller('departement')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Post()
  async create(@Body() createDepartementDto: CreateDepartementDto) {
    return await this.departementService.create(createDepartementDto);
  }

  @Get()
  async findAll() {
    return await this.departementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.departementService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDepartementDto: UpdateDepartementDto) {
    return await this.departementService.update(+id, updateDepartementDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.departementService.remove(+id);
  }
}
