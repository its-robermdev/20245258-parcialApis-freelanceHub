import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/*
  UsersSeed
  - Se asegura de que exista un usuario inicial en la base de datos para facilitar el desarrollo y las pruebas.
  - Si la tabla de usuarios está vacía, crea un usuario con credenciales predeterminadas.
*/

@Injectable()
export class UsersSeed implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.usersRepository.count();

    if (count === 0) {
      const user = this.usersRepository.create({
        email: 'rober.moran@freelance.hub',
        name: 'Rober Morán',
        password: 'password123',
      });

      await this.usersRepository.save(user);
    }
  }
}
