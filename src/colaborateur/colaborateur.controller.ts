import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ColaborateurService } from './colaborateur.service';
import { CreateColaborateurDto } from './dto/create-colaborateur.dto';
import { UpdateColaborateurDto } from './dto/update-colaborateur.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';

@Controller('colaborateur')
export class ColaborateurController {
  constructor(private readonly colaborateurService: ColaborateurService) {}


  @Post()
  @UseInterceptors(FilesInterceptor('image',1,{
    storage:diskStorage({
      destination:'./photo',
      filename:editFileName,
    }),
    fileFilter:imageFileFilter
  })) // 👈 field name must match
  
  async create(@UploadedFiles() image: Array<Express.Multer.File>, @Body() createColaborateurDto: CreateColaborateurDto ) {
    console.log("ici aussi mon image",image);
    
    return await this.colaborateurService.create(createColaborateurDto,image[0]);
  }

  @Get()
  async findAll() {
    return await this.colaborateurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.colaborateurService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateColaborateurDto: UpdateColaborateurDto) {
    return await this.colaborateurService.update(+id, updateColaborateurDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.colaborateurService.remove(+id);
  }
}
