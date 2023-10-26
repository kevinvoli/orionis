import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany,DeleteDateColumn,ManyToMany, JoinTable } from 'typeorm';
import { Admin } from './admin.entity';
import { Permissions } from './permissions.entity';



// export enum Role{
//   admin = 'admin',
//   operator = 'operator',
//   customer = 'customer',
// }

@Entity()
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 255, select:true })
  nom: string;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

  @OneToMany(()=> Admin, (admin)=> admin.roles)
  admin: Admin;

  @ManyToMany(()=> Permissions)
  @JoinTable()
  permission: Permissions[];

}