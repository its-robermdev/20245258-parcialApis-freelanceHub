import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';

/*
  ServicesService
  - Proporciona métodos para interactuar con la entidad Service en la base de datos.
  
  @create → Crea un nuevo servicio en la base de datos asociándolo con un proveedor (usuario) específico.
  @findAll → Devuelve una lista de todos los servicios disponibles, incluyendo la información del proveedor asociado a cada servicio.

*/

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    private usersService: UsersService,
  ) {}

  /*
    Crea un nuevo servicio en la base de datos asociándolo con un proveedor (usuario) específico.
    @param data → Los datos del servicio a crear, validados por el DTO de CreateServiceDto.
    @param providerId → El ID del usuario que proveerá el servicio
    @returns El servicio creado con su información completa, incluyendo el proveedor asociado.
  */
  async create(data: CreateServiceDto, providerId: number): Promise<Service> {
    const provider = await this.usersService.findById(providerId);
    const service = this.servicesRepository.create({
      ...data,
      provider,
    });

    return this.servicesRepository.save(service);
  }

  /*
    Devuelve una lista de todos los servicios disponibles, incluyendo la información del proveedor asociado a cada servicio.
    @returns Una promesa que resuelve en un array de servicios.
  */
  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find({ relations: { provider: true } });
  }
}
