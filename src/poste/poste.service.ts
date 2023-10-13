import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePosteDto } from './dto/create-poste.dto';
import { UpdatePosteDto } from './dto/update-poste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Poste } from './entities/poste.entity';
import { Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';

@Injectable()
export class PosteService {

  constructor(
    @InjectRepository(Poste)
    private readonly PosteRepository: Repository<Poste>,

    @InjectRepository(Departement)
    private readonly DepartementRepository: Repository<Departement>,
  ){  }

  async create(createPosteDto: CreatePosteDto) {

   
    
    const newPoste = new Poste()
    try {
      const departement = await this.DepartementRepository.findOne({
        where:{id:+createPosteDto.departement}
      }) 
      console.log(createPosteDto);
      newPoste.title = createPosteDto.title
      newPoste.description = createPosteDto.description
      newPoste.departement = departement
      const poste= await this.PosteRepository.save(newPoste)
      console.log("le poste",poste);
      
    return newPoste;
    } catch (error) {
      throw new ConflictException(error)
    }
    
  }

  async findAll() {
    try {
      const poste = await this.PosteRepository.find({
        relations:{
          departement:true
        }
      })
      return poste
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const poste = await this.PosteRepository.find()
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
      throw new NotFoundException(error)
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
      throw new NotFoundException(error)
    }
  }
}
