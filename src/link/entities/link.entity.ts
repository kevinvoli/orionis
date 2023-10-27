

import { Colaborateur } from 'src/colaborateur/entities/colaborateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum Status{
  Active=  "Active",
  Delete = "Delete",
  Disable = "Disable"
}

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  icon: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;
  
  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  // @ManyToOne(() => Colaborateur, (colaborateur) => colaborateur.link)
  // colaborateur: Colaborateur;
}
