import { Direction } from "src/direction/entities/direction.entity";
import { Poste } from "src/poste/entities/poste.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}


@Entity()
export class Departement {

  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "nom", length: 255 ,unique: true})
  nom: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description : string;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @OneToMany(()=>Service,(service)=> service.departement)
  service:Service[];

  @ManyToOne(()=>Direction,(direction)=> direction.departement)
  direction:Direction
}
