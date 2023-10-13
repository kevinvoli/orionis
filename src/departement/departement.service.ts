import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departement } from './entities/departement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartementService {

  constructor(
    @InjectRepository(Departement)
    private readonly DepartementRepository: Repository<Departement>
  ){  }

  
  async create(createDepartementDto: CreateDepartementDto) {
    const newDepartement = new Departement()
    try {
     newDepartement.name = createDepartementDto.name
     newDepartement.description = createDepartementDto.description


      this.DepartementRepository.save(newDepartement)
    return newDepartement;
    } catch (error) {
      throw new ConflictException(error)
    }

  }

  async findAll() {
    try {
      const departement = await this.DepartementRepository.find({
        relations:{poste:true}
      })
      return departement
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const departement = await this.DepartementRepository.find({
        relations:{
          poste:true
        }
      })
      return departement
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateDepartementDto: UpdateDepartementDto) {
    console.log("mon id:",id);
    
    try {
      const departement = await this.DepartementRepository.findOne({
        where:{
          id:id
        } 
      })
      console.log("poste update",departement);
      
      if(!departement) throw new NotFoundException('post null')
      Object.assign(departement, updateDepartementDto)
      return await this.DepartementRepository.save(departement)
    } catch (error) {
      throw new NotFoundException(error)
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
      throw new NotFoundException(error)
    }
  }
}
