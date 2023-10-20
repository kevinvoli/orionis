import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePosteDto } from './dto/create-poste.dto';
import { UpdatePosteDto } from './dto/update-poste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Poste } from './entities/poste.entity';
import { Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';
import { Service } from 'src/service/entities/service.entity';

@Injectable()
export class PosteService {

  constructor(
    @InjectRepository(Poste)
    private readonly PosteRepository: Repository<Poste>,

  ){  }

  async create(createPosteDto: CreatePosteDto) {

   
    
    const newPoste = new Poste()
    try {
      // const service = await this.ServiceRepository.findOne({
      //   where:{id:+createPosteDto.departement}
      // }) 
      console.log(createPosteDto);
      newPoste.title = createPosteDto.title
      newPoste.description = createPosteDto.description
      newPoste.status = createPosteDto.status
      const poste= await this.PosteRepository.save(newPoste)

      console.log("le poste",poste);
      
    return newPoste;
    } catch (error) {
      throw new ConflictException()
    }
    
  }

  async findAll() {
    try {
      console.log("icicicicicici");

      const poste = await this.PosteRepository.find({
        relations:{
          colaborateur:true
        }
      })
      return poste
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      console.log("icicicicicici");
      
      const poste = await this.PosteRepository.findOne({   where:{id: id},relations:{
        colaborateur:true
      }})
      return poste
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updatePosteDto: UpdatePosteDto) {
    console.log("mon id:",id);
    
    try {
      const poste = await this.PosteRepository.findOne({
        where:{
          id:id
        }
      })
      console.log("poste update",poste);
      
      if(!poste) throw new NotFoundException('post null')
      Object.assign(poste, updatePosteDto)
      return await this.PosteRepository.save(poste)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async remove(id: number) {
    try {
      const poste = await this.PosteRepository.findOne({
        where: {id}
      });
      if(!poste) throw new NotFoundException('null' );
  
      await this.PosteRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
