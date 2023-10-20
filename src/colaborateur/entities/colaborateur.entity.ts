import { Link } from "src/link/entities/link.entity";
import { Poste } from "src/poste/entities/poste.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status {
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}



@Entity()
export class Colaborateur {
  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "nom", length: 255 ,unique: false})
  nom:string;

  @Column("varchar", { name: "prenoms", nullable: false, length: 255 })
  prenoms: string | null;

  @Column("varchar", { name: "email", unique: true, length: 180 })
  email: string;

  @Column("varchar", { name: "biographie", unique: false, length: 180 })
  biographie: string;

  @Column("varchar", { name: "telephone_fixe", nullable: true, length: 50 })
  telephone_fixe: string | null;

  @Column("varchar", { name: "telephone_portable", nullable: true, length: 50 })
  telephone_portable: string | null;

  @Column("varchar", { name: "photo", nullable: true, length: 255 })
  photo: string | null;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @ManyToOne(()=>Poste,(poste)=> poste.colaborateur)
  poste:Poste
  
  @ManyToOne(()=>Service,(service)=> service.colaborateur)
  service:Service

  @OneToMany(() => Link, (link) => link.colaborateur)
  link: Link[];
}
