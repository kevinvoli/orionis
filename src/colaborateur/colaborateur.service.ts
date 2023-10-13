import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColaborateurDto } from './dto/create-colaborateur.dto';
import { UpdateColaborateurDto } from './dto/update-colaborateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborateur } from './entities/colaborateur.entity';
import { Repository } from 'typeorm';
import { Poste } from 'src/poste/entities/poste.entity';

@Injectable()
export class ColaborateurService {

  
  constructor(
    @InjectRepository(Colaborateur)
    private readonly ColaborateurRepository: Repository<Colaborateur>,
    @InjectRepository(Poste)
    private readonly posteborateurRepository: Repository<Poste>,
  ){  }

  async create(createColaborateurDto: CreateColaborateurDto,image ) {
    console.log('ici se trouve mon image', image);
    const postes = await this.posteborateurRepository.findOne({
      where:{id:+createColaborateurDto.poste}
    })
    
    const newColaborateur = new Colaborateur()
    try {
      newColaborateur.name = createColaborateurDto.name
      newColaborateur.contacts_flotte = createColaborateurDto.contacts_flotte
      newColaborateur.contacts_perso = createColaborateurDto.contacts_perso
      newColaborateur.email = createColaborateurDto.email
      newColaborateur.photo = `photo/${image.filename}`
      newColaborateur.poste = postes


      this.ColaborateurRepository.save(newColaborateur)
    return newColaborateur;
    } catch (error) {
      throw new ConflictException(error)
    }
  }

  async findAll() {
    try {
      return await this.ColaborateurRepository.find({
        relations:{
          poste:true
        }
      });
    } catch (error) {
      return error
    }

  }

  async findOne(id: number) {
    console.log("ici");
    
    try {
      return await this.ColaborateurRepository.findOne({
        where:{id:id},
        relations:{
          poste:true
        }
      });
    } catch (error) {
      return error
    }

  }

  async update(id: number, updateColaborateurDto: UpdateColaborateurDto) {
    try {
      const status = await this.ColaborateurRepository.findOne({
        where:{id:id}
      })
      if(!status) throw new NotFoundException('facture')
      Object.assign(status, updateColaborateurDto)
      return await this.ColaborateurRepository.save(status)
    } catch (error) {
      throw new NotFoundException(error)
    }
    return `This action updates a #${id} colaborateur`;
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
      throw new NotFoundException(error)
    }
    return `This action removes a #${id} colaborateur`;
  }
}
