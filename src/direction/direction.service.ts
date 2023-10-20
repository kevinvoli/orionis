import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(Direction)
    private readonly DirectionRepository: Repository<Direction>
  ){  }

  create(createDirectionDto: CreateDirectionDto) {
    const newDepartement = new Direction()
    try {
     newDepartement.nom = createDirectionDto.nom
     newDepartement.description = createDirectionDto.description
     newDepartement.status = createDirectionDto.status


      this.DirectionRepository.save(newDepartement)
    return newDepartement;
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findAll() {
    try {
      const departement = await this.DirectionRepository.find({
        relations:{departement:true}
      })
      return departement
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findOne(id: number) {
    try {
      const departement = await this.DirectionRepository.findOne({
        where:{id: id},
        relations:{
          departement:true
        }
      })
      return departement
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    console.log("mon id:",id);
    
    try {
      const departement = await this.DirectionRepository.findOne({
        where:{
          id:id
        } 
      })
      console.log("poste update",departement);
      
      if(!departement) throw new NotFoundException('post null')
      Object.assign(departement, updateDirectionDto)
      return await this.DirectionRepository.save(departement)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    try {
      const departement = await this.DirectionRepository.findOne({
        where: {id}
      });
      if(!departement) throw new NotFoundException('null' );
      await this.DirectionRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
