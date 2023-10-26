import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn ,ManyToOne, OneToMany} from 'typeorm';
import { Roles } from './role.entity';


@Entity()
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "email", unique: true, length: 180 })
  email: string;

  @Column("varchar", { name: "password", length: 255, select:true })
  password: string;

  @ManyToOne(()=> Roles, (roles)=> roles.admin)
  roles: Roles;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;


}




