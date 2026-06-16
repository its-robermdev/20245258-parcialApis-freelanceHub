import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/*
  UsersService
  - Proporciona métodos para interactuar con la entidad User en la base de datos.
  
  @findByEmail → Busca un usuario por su correo electrónico. Devuelve el usuario si se encuentra o null si no existe.
  @findById → Busca un usuario por su ID. Devuelve el usuario si se encuentra o lanza una excepción de 404 not found si no existe.

*/
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /*
    Busca un usuario por su correo electrónico. Devuelve el usuario si se encuentra o null si no existe.
    @param email → El correo electrónico del usuario a buscar.
    @returns Una promesa que resuelve en el usuario encontrado o null si no existe.
  */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /*
    Busca un usuario por su ID. Devuelve el usuario si se encuentra o lanza una excepción de 404 not found si no existe.
    @param id → El ID del usuario a buscar.
    @returns Una promesa que resuelve en el usuario encontrado.
  */
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    // Si el usuario no existe, tira excepción de 404 not found
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }
}
