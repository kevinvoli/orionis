import { Colaborateur } from "src/colaborateur/entities/colaborateur.entity";
import { Direction } from "src/direction/entities/direction.entity";
import { Link } from "src/link/entities/link.entity";
import { Poste } from "src/poste/entities/poste.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class ResponsableDirection {
  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @ManyToOne(()=>Direction,(direction)=> direction.responsable)
  direction:Direction
  
  @ManyToOne(()=>Colaborateur,(colaborateur)=> colaborateur.responsableDir)
  collaborateur:Colaborateur

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}


  // @Column("varchar", { name: "email", unique: true, length: 180 })
  // email: string; 