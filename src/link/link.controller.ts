import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post(':collaborateurId')
  create(@Body() createLinkDto: CreateLinkDto,@Param('collaborateurId') collaborateurId:string) {
    return this.linkService.create(createLinkDto,+collaborateurId);
  }

  @Get(':userId')
  async findAll( @Param('userId') userId: string) {
    console.log("mes param",userId);
    return await this.linkService.findAll(+userId);
  }

  @Get(':id/users/:userId')
  findOne(
    @Param('id') id: string,
    @Param('userId') userId: string
  ) {
    return this.linkService.findOne(+id,+userId);
  }

  @Patch(':id/users/:userId')
  update(
    @Param('id') id: string,
    @Param('userId') userId: string, 
    @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto,+userId);
  }
  @Delete(':id/users/:userId')
  remove(
    @Param('id') id: string,
    @Param('userId') userId: string) {
    return this.linkService.remove(+id, +userId);
  }

}
