import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn ,ManyToOne, OneToMany,ManyToMany} from 'typeorm';
import { Roles } from './role.entity';
import { Objects } from './objects.entity';


@Entity()
export class Permissions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "action", length: 255, select:true })
  action: string;

  // @ManyToMany(()=> Roles, (roles)=> roles.admin,{onDelete: 'NO ACTION', onUpdate: 'NO ACTION',})
  // roles?: Roles[];

  @ManyToOne(()=> Objects, (objects)=> objects.permissions)
  objects: Objects;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;


}




