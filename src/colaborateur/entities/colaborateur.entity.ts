import { Poste } from "src/poste/entities/poste.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Status {
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}



@Entity()
export class Colaborateur {
  @PrimaryGeneratedColumn({type:"int"})
  id: number;

  @Column("varchar", { name: "name", length: 255 ,unique: true})
  name:string;

  @Column("varchar", { name: "prenoms", nullable: true, length: 255 })
  prenoms: string | null;

  @Column("varchar", { name: "email", unique: false, length: 180 })
  email: string;

  @Column("varchar", { name: "contacts_perso", nullable: true, length: 50 })
  contacts_perso: string | null;

  @Column("varchar", { name: "contacts_flotte", nullable: true, length: 50 })
  contacts_flotte: string | null;

  @Column("varchar", { name: "ligne_fixe", nullable: true, length: 50 })
  ligne_fixe: string | null;

  @Column("varchar", { name: "departement", length: 255 ,unique: false})
  departement:string;

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
}
