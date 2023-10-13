import { Poste } from "src/poste/entities/poste.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}


@Entity()
export class Departement {

  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "name", length: 255 ,unique: true})
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description : string;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @OneToMany(()=>Poste,(poste)=> poste.departement)
  poste:Poste[]
}
