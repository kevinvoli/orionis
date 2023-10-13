import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('photo')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }


  @Get(':imgpath')
  async seeUploadedFile(@Param('imgpath') imageName, @Res() res) {
    const options =  { root: './photo/', }
    const imagePath =`${options.root}/${imageName}`
    try {
      const send= await res.sendFile(imageName,options, async (error) => {
        if (error) {
          console.log('premiere erreur'); 
          return new HttpException("Impossible d'afficher l'image", HttpStatus.BAD_REQUEST);
        }
      });
        let mimeType;
        if (imageName.endsWith('.jpg') || imageName.endsWith('.jpeg')) {
          mimeType = 'image/jpeg';
        } else if (imageName.endsWith('.png')) {
          mimeType = 'image/png';
        } else if (imageName.endsWith('.gif')) {
          mimeType = 'image/gif';
        }
         res.setHeader('Content-Type', mimeType);
         return send
    } catch (error) {
      return new HttpException("Impossible d'afficher l'image", HttpStatus.BAD_REQUEST);
    }
  }
  //  @Get()
  // findAll() {
  //   console.log('passssssss');
    
  //   return this.mediaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mediaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
