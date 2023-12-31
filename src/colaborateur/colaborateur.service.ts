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
    const {nom,telephone_fixe ,telephone_portable,email,poste,service} = createColaborateurDto;
    const newColaborateur = new Colaborateur()
    try {
      const postes = await this.posteborateurRepository.findOne({
        where:{id:+createColaborateurDto.poste}
      })
      const services = await this.ServiceRepository.findOne({
        where:{id:+createColaborateurDto.service}
      })
      
      newColaborateur.nom = createColaborateurDto.nom
      newColaborateur.telephone_fixe = createColaborateurDto.telephone_fixe
      newColaborateur.prenoms = createColaborateurDto.prenoms
      newColaborateur.telephone_portable = createColaborateurDto.telephone_portable
      newColaborateur.email = createColaborateurDto.email
      newColaborateur.poste = postes
      newColaborateur.sexe = createColaborateurDto.sexe
      newColaborateur.service = services 
      newColaborateur.biographie = createColaborateurDto.biographie
      newColaborateur.grade = createColaborateurDto.grade

      if(createColaborateurDto.linkedinLink){
        newColaborateur.linkedinLink = createColaborateurDto.linkedinLink
      }
      if (createColaborateurDto.instagrammeLink) {
        console.log("lien insta", createColaborateurDto.instagrammeLink);
        
      newColaborateur.instagrammeLink = createColaborateurDto.instagrammeLink
      }
      if (image) {
        newColaborateur.photo = `photo/${image.filename}`
      }
      const colaborateur = await this.ColaborateurRepository.save(newColaborateur)
      // if (colaborateur) {
      //   if (createColaborateurDto.link) {
      //     for (const linkDto of createColaborateurDto.link) {
      //       const lin = new Link();
      //       lin.icon = linkDto.icon
      //       lin.link = linkDto.link
      //       lin.name = linkDto.name
      //       // lin.colaborateur= colaborateur
      //        await this.linkRepository.save(lin)
      //     }
      //   }
      // }
    return colaborateur;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const duplicateField = error.message.match(/'(.+?)'/);
        const message = `La valeur dupliquée pour le champ ${duplicateField[1]}.`;
        throw new ConflictException(`La duplication de données est interdite ${message}`);
      } else {
        throw new Error('Une erreur inattendue s\'est produite.');
      }
  
    }
  }

  async findService(id:number){
    try {
      const colab = await this.ColaborateurRepository.find({
        where:{
          service:{id:id}
        },
        relations:{
          poste:true,
          service:{departement:true},
        }
      })
      console.log("mes colaborateur", colab); 
      return colab
    } catch (error) {
      throw new NotFoundException(error)
    }
  }



  async findDirection(directionId:number){
    const collaborateursDeLaDirection = await this.ColaborateurRepository
    .createQueryBuilder('colaborateur')
    .leftJoinAndSelect('colaborateur.service', 'service')
    .leftJoin('service.departement', 'departement')
    .leftJoinAndSelect('colaborateur.poste','poste')
    .leftJoin('departement.direction','direction')
    .where('direction.id = :directionId', { directionId })
    .getMany();
  return collaborateursDeLaDirection;
  }

  async findDepartement(departementId:number){

     const collaborateursDuDepartement = await this.ColaborateurRepository
     .createQueryBuilder('colaborateur')
     .leftJoinAndSelect('colaborateur.service', 'service')
     .leftJoin('service.departement', 'departement')
     .leftJoinAndSelect('colaborateur.poste','poste')
     .where('departement.id = :departementId', { departementId })
     .getMany();
   return collaborateursDuDepartement;
  }

  async findAll() {
    try {
      return await this.ColaborateurRepository.find({
        relations:{
          poste:true,
          service:{departement:true},
          // link:true
        }
      });
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const collaborateur = await this.ColaborateurRepository.findOne({
        where:{id:id},
        relations:{
          poste:true,
          service:{departement:true},
          // link:true
        }
      });
      console.log("les collaborateur",collaborateur)
      return collaborateur    
    } catch (error) {
      
      throw new NotFoundException()
    }

  }

  async update(id: number, updateColaborateurDto) {
    console.log("mes photo sont icic",updateColaborateurDto);
    
    try {
      const status = await this.ColaborateurRepository.findOne({
        where:{id:id}
      })
      
      if(!status) throw new NotFoundException('facture')
      Object.assign(status, updateColaborateurDto)
      const colaborateur= await this.ColaborateurRepository.save(status)
      // console.log("les collaborateur",colaborateur)
      return colaborateur
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) { 
    try {
      const status = await this.ColaborateurRepository.findOne({
        where: {id}
      });
      if(!status) throw new NotFoundException('facture' );
      await this.ColaborateurRepository.delete({id});
      return await this.ColaborateurRepository.delete({id});
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
