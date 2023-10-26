import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';

@Injectable()
export class LinkService {
  

  constructor(
    @InjectRepository(Link)
    private readonly LinkRepository: Repository<Link>,

    @InjectRepository(Colaborateur)
    private readonly colaborateurRepository: Repository<Colaborateur>

  ){  }

  async create(createLinkDto: CreateLinkDto, collaborateurId:number) {
    const newLink = new Link()
    try {
      const collaborareur = await this.colaborateurRepository.findOne({where:{
        id:collaborateurId
      }})
      if (!collaborareur) {
        throw new NotFoundException("")
      }  
      newLink.name = createLinkDto.name
      newLink.icon = createLinkDto.icon
      newLink.link = createLinkDto.link
      // newLink.colaborateur = collaborareur
      await this.LinkRepository.save(newLink)
     return newLink;
     } catch (error) {
       throw new NotFoundException()
     }
  }

  async findAll(userId:number) {
    try {

      const link = await this.LinkRepository.find({
        // where:{colaborateur:{
        //   id:userId
        // }},
        // relations:{
        //  colaborateur:true
        // }
      });
      if (!link) {
        throw new NotFoundException(`SocialMedia with ID ${userId} not found for the user`);
      }
      return link
    } catch (error) {

      throw new NotFoundException(error)
    }

  }

  async  findOne(id: number,userId:number) {
    try {
      const collaborateur = await this.LinkRepository.findOne({
        where:{
          id:id,
          // colaborateur:{
          //   id:userId
          // }
        },
        // relations:{
        //   colaborateur:true
        // }
      });
      console.log("les collaborateur",collaborateur)
      return collaborateur    
    } catch (error) {
      
      throw new NotFoundException()
    }
  }
  async update(id: number, updateLinkDto: UpdateLinkDto,userId:number) {
    try {
      const status = await this.LinkRepository.findOne({
        where:{
          id:id,
          // colaborateur:{
          //   id:userId
          // }

        }
      })
      
      if(!status) throw new NotFoundException('facture')
      Object.assign(status, updateLinkDto)
      const colaborateur= await this.LinkRepository.save(status)
      console.log("les collaborateur",colaborateur)
      return colaborateur
    } catch (error) {
      throw new NotFoundException()
    };
  }

  async remove(id: number,userId:number) {
    try {
      const status = await this.LinkRepository.findOne({
        where: {id:id,
          // colaborateur:{
          //   id:userId
          // }
        }
      });
      if(!status) throw new NotFoundException(`Link with ID ${id} not found` );
      const result = await this.LinkRepository.delete({id});
      return result
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
