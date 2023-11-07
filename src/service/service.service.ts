import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';
import { Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';

@Injectable()
export class ServiceService {

  
  constructor(
    @InjectRepository(Departement)
    private readonly DepartementRepository: Repository<Departement>,

    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
  ){  }

  async create(createServiceDto: CreateServiceDto) {

    const newPoste = new Service()
    try {
      const departement = await this.DepartementRepository.findOne({
        where:{id:+createServiceDto.departement}
      }) 
      console.log(createServiceDto);
      newPoste.nom = createServiceDto.nom
      newPoste.description = createServiceDto.description
      newPoste.departement = departement
      const poste= await this.ServiceRepository.save(newPoste)
    return poste;
    } catch (error) {
      throw new ConflictException()
    }
  }

  async findAll() {
    try {
      const poste = await this.ServiceRepository.find({
        relations:{
          departement:true,
          colaborateur:true
        }
      })
      return poste
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findOne(id: number) {
    try {
      const poste = await this.ServiceRepository.findOne(
        {
          where:{id: id},
          relations: {departement:true, colaborateur:true}})
      return poste
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    console.log("mon id:",id);
    
    try {
      const poste = await this.ServiceRepository.findOne({
        where:{
          id:id
        }
      })
      console.log("poste update",poste);
      
      if(!poste) throw new NotFoundException('post null')
      Object.assign(poste, updateServiceDto)
      return await this.ServiceRepository.save(poste)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    try {
      const poste = await this.ServiceRepository.findOne({
        where: {id}
      });
      if(!poste) throw new NotFoundException('null' );
  
      await this.ServiceRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
