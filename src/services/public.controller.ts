import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';

/*
  PublicController
  - Define endpoints públicos que no requieren autenticación para acceder a la información de los servicios disponibles.
  - Utiliza el ServicesService para obtener la lista de servicios
*/

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Listar servicios disponibles' })
  @ApiResponse({ status: 200, description: 'Lista publica de servicios' })
  async findAll() {
    const services = await this.servicesService.findAll();

    // Mapea los servicios para devolver solo la información relevante al público, excluyendo datos sensibles del proveedor y dejando solo su nombre.
    return services.map((service) => ({
      id: service.id,
      title: service.title,
      category: service.category,
      price: service.price,
      provider: service.provider?.name,
    }));
  }
}
