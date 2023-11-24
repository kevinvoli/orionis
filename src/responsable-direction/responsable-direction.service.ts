import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsableDirectionDto } from './dto/create-responsable-direction.dto';
import { UpdateResponsableDirectionDto } from './dto/update-responsable-direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';
import { Direction } from 'src/direction/entities/direction.entity';
import { Repository } from 'typeorm';
import { ResponsableDirection } from './entities/responsable-direction.entity';
import { Departement } from '../departement/entities/departement.entity';

@Injectable()
export class ResponsableDirectionService {

  constructor(
    @InjectRepository(ResponsableDirection)
    private readonly responsableDirectionServiceRepository: Repository<ResponsableDirection>,

    @InjectRepository(Colaborateur)
    private readonly collaborateurRepository: Repository<Colaborateur>,

    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ){  }


  async create(createResponsableDirectionDto: CreateResponsableDirectionDto) {
    const collaborateur  = await this.collaborateurRepository.findOne(
      {where:{id: +createResponsableDirectionDto.collaborateur}})
      console.log("collaborateur",collaborateur);

      if(!collaborateur) throw new NotFoundException('null' );
    const direction = await this.directionRepository.findOne({where: {id: +createResponsableDirectionDto.direction}}) 
console.log("direction",direction);

    if(!direction) throw new NotFoundException('null' );

    const newResponsable = new ResponsableDirection()
    newResponsable.collaborateur = collaborateur
    newResponsable.direction = direction
    const respo =await this.responsableDirectionServiceRepository.save(newResponsable)
  }
  

  async findAll() {
    try {
      const responsable = await this.responsableDirectionServiceRepository.find({
        relations :{
          collaborateur:true,
          direction : true
        }
      })
      return responsable
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findOne(id: number) {
    try {
      const responsable = await this.responsableDirectionServiceRepository.findOne({
        where:{id: id},
        relations :{
          collaborateur:true,
          direction : true
        }
      })
      return responsable
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: number, updateResponsableDirectionDto: UpdateResponsableDirectionDto) {
    try {
      const departement = await this.responsableDirectionServiceRepository.findOne({
        where:{
          id:id
        } 
      })
      
      if(!departement) throw new NotFoundException('post null')
      Object.assign(departement, updateResponsableDirectionDto)
      return await this.responsableDirectionServiceRepository.save(departement)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    try {
      const departement = await this.responsableDirectionServiceRepository.findOne({
        where: {id}
      });

      if(!departement) throw new NotFoundException('null' );
      await this.responsableDirectionServiceRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
