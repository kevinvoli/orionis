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
  @UseInterceptors(FilesInterceptor('photo',1,{
    storage:diskStorage({
      destination:'./photo',
      filename:editFileName,
    }),
    fileFilter:imageFileFilter
  })) // 👈 field name must match
  
  async create(@UploadedFiles() photo: Array<Express.Multer.File>, @Body() createColaborateurDto: CreateColaborateurDto ) {
    if (photo) {
      return await this.colaborateurService.create(createColaborateurDto,photo[0]);
    }
    return await this.colaborateurService.create(createColaborateurDto,false);
  }

  @Get()
  async findAll() {
    return await this.colaborateurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.colaborateurService.findOne(+id);
  }
  @UseInterceptors(FilesInterceptor('photo',1,{
    storage:diskStorage({
      destination:'./photo',
      filename:editFileName,
    }),
    fileFilter:imageFileFilter
  })) // 👈 field name must match
  @Patch(':id')
  async update(@UploadedFiles() photo: Array<Express.Multer.File>, @Param('id') id: string, @Body() updateColaborateurDto:UpdateColaborateurDto) {
    // console.log("mon colab",updateColaborateurDto);
    
    if (photo) {
          let data=updateColaborateurDto
          data.photo = `photo/${photo[0].filename}`
          console.log("voir ma photo",photo[0].filename);
        return await this.colaborateurService.update(+id, data);
        
    } 
    return await this.colaborateurService.update(+id, updateColaborateurDto); 
  }


//   @Patch(':userId/link/:linkId')
//   async updateLink(
//   @Param('userId') userId: string,
//   @Param('linkId') socialMediaId: string,
//   @Body('newLink') newLink: string,
// ) {
//   return await this.colaborateurService.updateLink(+userId, +socialMediaId);
// }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.colaborateurService.remove(+id);
  }
}
