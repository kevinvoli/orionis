import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn ,ManyToOne, OneToMany,ManyToMany} from 'typeorm';
import { Roles } from './role.entity';
import { Permissions } from './permissions.entity';


@Entity()
export class Objects {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "action", length: 255, select:true })
  nom: string;

  @OneToMany(()=> Permissions, (premission)=> premission.objects)
  permissions: Permissions;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;


}




