import { Departement } from "src/departement/entities/departement.entity";
import { ResponsableDirection } from "src/responsable-direction/entities/responsable-direction.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}


@Entity()
export class Direction {

  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "nom", length: 255 ,unique: true})
  nom: string;

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

  @OneToMany(()=>Departement,(departement)=> departement.direction)
  departement:Departement[]

  @ManyToOne(()=>ResponsableDirection,(responsable)=> responsable.direction)
  responsable:ResponsableDirection
}
