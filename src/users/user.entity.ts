import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from '../services/service.entity';

/*
  User Entity
  - Define la estructura de la tabla de usuarios en la base de datos.
*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Service, (service) => service.provider)
  services!: Service[];
}
