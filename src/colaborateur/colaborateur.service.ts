import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColaborateurDto } from './dto/create-colaborateur.dto';
import { UpdateColaborateurDto } from './dto/update-colaborateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborateur } from './entities/colaborateur.entity';
import { Repository } from 'typeorm';
import { Poste } from 'src/poste/entities/poste.entity';
import { Service } from 'src/service/entities/service.entity';
import { log } from 'console';
import { Link } from 'src/link/entities/link.entity';
const CircularJSON = require('circular-json');

@Injectable()
export class ColaborateurService {

  
  constructor(
    @InjectRepository(Colaborateur)
    private readonly ColaborateurRepository: Repository<Colaborateur>,
    @InjectRepository(Poste)
    private readonly posteborateurRepository: Repository<Poste>,

    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,

    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
  ){  }

  async create(createColaborateurDto: CreateColaborateurDto,image ) {
    const { links,nom,telephone_fixe ,telephone_portable,email,poste,service} = createColaborateurDto;

   
    
    const newColaborateur = new Colaborateur()
    try {
      const postes = await this.posteborateurRepository.findOne({
        where:{id:+poste}
      })
      const services = await this.ServiceRepository.findOne({
        where:{id:+service}
      })
      const data=[]
      for (const linkDto of links) {
        const lin = new Link();
        lin.icon = linkDto.icon
        lin.link = linkDto.link
        lin.name = linkDto.name
         data.push(await this.linkRepository.save(lin))
      }
      newColaborateur.nom = nom
      newColaborateur.telephone_fixe = telephone_fixe
      newColaborateur.telephone_portable = telephone_portable
      newColaborateur.email = email
      newColaborateur.poste = postes
      newColaborateur.service = services 
      console.log("mes", links);
      newColaborateur.link =  data
      if (image) {
        newColaborateur.photo = `photo/${image.filename}`
      }
      this.ColaborateurRepository.save(newColaborateur)
    return newColaborateur;
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findAll() {
    console.log("icicicicic", Date.now());
    try {
      
      return await this.ColaborateurRepository.find({
        relations:{
          poste:true,
          service:true,
          link:true
        }
      });
    } catch (error) {
      throw new NotFoundException(error)
    }

  }

  async findOne(id: number) {
    console.log("ici");
    
    try {
      const collaborateur = await this.ColaborateurRepository.findOne({
        where:{id:id},
        relations:{
          poste:true,
          service:true,
          link:true
        }
      });
      console.log("les collaborateur",collaborateur)
      return collaborateur    
    } catch (error) {
      
      throw new NotFoundException()
    }

  }

  async update(id: number, updateColaborateurDto) {
    try {
      const status = await this.ColaborateurRepository.findOne({
        where:{id:id}
      })
      
      if(!status) throw new NotFoundException('facture')
      Object.assign(status, updateColaborateurDto)
      const colaborateur= await this.ColaborateurRepository.save(status)
      console.log("les collaborateur",colaborateur)
      return colaborateur
    } catch (error) {
      throw new NotFoundException()
    }

  }

  async updateLink(userId: number, linkId: number, newLink: string){
    const user = await this.ColaborateurRepository.findOne({
      where:{id:userId},
      relations:{
        poste:true,
        service:true,
        link:true
      }
    });
    if (!user) {
      throw new NotFoundException(`Colaborateur with ID ${userId} not found`);
    }
  
    const link = user.link.find((link) => link.id === linkId);
    if (!link) {
      throw new NotFoundException(`Link with ID ${linkId} not found for the Colaborateur`);
    }
  
    link.link = newLink;
    await this.linkRepository.save(link);
  
    return user;
  }
  

  async remove(id: number) {

    try {
      const status = await this.ColaborateurRepository.findOne({
        where: {id}
      });
      if(!status) throw new NotFoundException('facture' );
  
      await this.ColaborateurRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  
  }
}
