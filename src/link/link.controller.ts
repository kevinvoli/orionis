import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post(':collaborateurId')
  async create(@Body() createLinkDto: CreateLinkDto,@Param('collaborateurId') collaborateurId:string) {
    return await this.linkService.create(createLinkDto,+collaborateurId);
  }

  @Get(':userId')
  async findAll( @Param('userId') userId: string) {
    return await this.linkService.findAll(+userId);
  }

  @Get(':id/users/:userId')
  async findOne(
    @Param('id') id: string,
    @Param('userId') userId: string
  ) {
    return await this.linkService.findOne(+id,+userId);
  }

  @Patch(':id/users/:userId')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string, 
    @Body() updateLinkDto) {
      try {
         return await this.linkService.update(+id, updateLinkDto,+userId);
      } catch (error) {
        throw new HttpException("echec de mise a jour",400,error);
        
      }
  }
  @Delete(':id/users/:userId')
  async remove(
    @Param('id') id: string,
    @Param('userId') userId: string) {
    return await this.linkService.remove(+id, +userId);
  }

}
