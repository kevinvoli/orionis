import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PosteService } from './poste.service';
import { CreatePosteDto } from './dto/create-poste.dto';
import { UpdatePosteDto } from './dto/update-poste.dto';
import { Colaborateur } from '../colaborateur/entities/colaborateur.entity';

@Controller('poste')
export class PosteController {
  constructor(private readonly posteService: PosteService) {}

  @Post()
  async create(@Body() createPosteDto: CreatePosteDto, @Request() req) {
    console.log(createPosteDto);
    
    if(createPosteDto){
      return await this.posteService.create(createPosteDto)
    }
    const poste = await  this.posteService.create(createPosteDto);
    return poste
  }

  @Get()
  async findAll() {
    return await this.posteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.posteService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePosteDto) {
    console.log("mes id:",id);
    
    return await this.posteService.update(+id, updatePosteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.posteService.remove(+id);
  }
}
