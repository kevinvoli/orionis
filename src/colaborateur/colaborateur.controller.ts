import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { ColaborateurService } from './colaborateur.service';
import { CreateColaborateurDto } from './dto/create-colaborateur.dto';
import { UpdateColaborateurDto } from './dto/update-colaborateur.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { Colaborateur } from './entities/colaborateur.entity';

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
  async findAll(
    @Query('serviceId') serviceId: string,
    @Query('departementId') departementId: string,
    @Query('directionId') directionId: string) {
    if (serviceId) {
      return await this.colaborateurService.findService(+serviceId)
    }else if (departementId) {
    console.log( "mes departement",departementId);
      return await this.colaborateurService.findDepartement(+departementId)
    } else if (directionId) {
      return await this.colaborateurService.findDirection(+directionId)
    }

    return await this.colaborateurService.findAll();
  }

  // @Get()
  // async getservice(@Query('serviceId') serviceId: string) {
  //   console.log( serviceId);
    
  //  
  // }
  // findAll(@Query('serviceId') serviceId: string) {
  //   // Votre logique métier pour gérer la requête
  //   return `Vous avez demandé des informations sur les collaborateurs du service avec l'ID ${serviceId}`;
  // }


  @Get(':id/')
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
    console.log("grade:", updateColaborateurDto.grade);
    
    // console.log("mon colab",updateColaborateurDto);

    
    if (photo.length >=1) {
      
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
