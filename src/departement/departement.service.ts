import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departement } from './entities/departement.entity';
import { Repository } from 'typeorm';
import { Direction } from 'src/direction/entities/direction.entity';

@Injectable()
export class DepartementService {

  constructor(
    @InjectRepository(Departement)
    private readonly DepartementRepository: Repository<Departement>,
    @InjectRepository(Direction)
    private readonly DirectionRepository: Repository<Direction>,
  ){  }

  
  async create(createDepartementDto: CreateDepartementDto) {


    const newDepartement = new Departement()
    try {

      const service = await this.DirectionRepository.findOne({
        where:{id:+createDepartementDto.direction}
      }) 
     newDepartement.nom = createDepartementDto.nom
     newDepartement.description = createDepartementDto.description
     newDepartement.direction = service


      this.DepartementRepository.save(newDepartement)
    return newDepartement;
    } catch (error) {
      throw new NotFoundException()
    }

  }

  async findAll() {
    try {
      const departement = await this.DepartementRepository.find({
        relations:{service:true,direction:true}
      })
      return departement
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findOne(id: number) {
    try {
      const departement = await this.DepartementRepository.findOne({
        where:{id: id},
        relations:{service:true,direction:true}
      })
      console.log(departement);
      
      return departement
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: number, updateDepartementDto: UpdateDepartementDto) {
    console.log("mon id:",id);
    
    try {
      const departement = await this.DepartementRepository.findOne({
        where:{
          id:id
        } ,
        relations:{service:true,direction:true}
      })
      console.log("poste update",departement);
      
      if(!departement) throw new NotFoundException('post null')
      Object.assign(departement, updateDepartementDto)
      return await this.DepartementRepository.save(departement)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    try {
      const departement = await this.DepartementRepository.findOne({
        where: {id}
      });
      if(!departement) throw new NotFoundException('null' );
      await this.DepartementRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
