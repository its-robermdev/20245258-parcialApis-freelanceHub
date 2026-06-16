import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

/*
  ServicesController
  - Define el endpoint para crear un nuevo servicio, que solo puede ser accedido por usuarios autenticados.
  - Utiliza el ServicesService para manejar la lógica de creación del servicio y asociarlo al usuario que lo publica.
*/

@ApiTags('services')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Publicar un nuevo servicio' })
  @ApiResponse({ status: 201, description: 'Servicio creado correctamente' })
  @ApiResponse({ status: 401, description: 'Token invalido o ausente' })
  create(@Body() body: CreateServiceDto, @Req() req: any) {
    return this.servicesService.create(body, req.user.userId);
  }
}
