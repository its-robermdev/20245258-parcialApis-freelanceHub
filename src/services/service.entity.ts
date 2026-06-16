import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

/*
  Service Entity
  - Define la estructura de la tabla de servicios en la base de datos.
*/

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @Column('float')
  price!: number;

  @ManyToOne(() => User, (user) => user.services)
  provider!: User;
}
