import { Colaborateur } from "src/colaborateur/entities/colaborateur.entity";
import { Departement } from "src/departement/entities/departement.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

@Entity()
export class Poste {

  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "title", length: 255 ,unique: true})
  title:string;

  @Column("varchar", { name: "status", nullable: true, length: 255, default:Status.Active })
  status: Status;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description : string;
 
  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @OneToMany(()=>Colaborateur,(colaborateur)=> colaborateur.poste)
  colaborateur:Colaborateur[]

}
