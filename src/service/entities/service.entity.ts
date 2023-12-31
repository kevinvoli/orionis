import { Colaborateur } from "src/colaborateur/entities/colaborateur.entity";
import { Departement } from "src/departement/entities/departement.entity";
import { Poste } from "src/poste/entities/poste.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}


@Entity()
export class Service {
  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "nom", length: 255 ,unique: true})
  nom: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description : string;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @OneToMany(()=>Colaborateur,(colaborateur)=> colaborateur.service)
  colaborateur:Poste[]

  @ManyToOne(()=>Departement,(departement)=> departement.service)
  departement:Departement
}
