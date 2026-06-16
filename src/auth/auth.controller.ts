import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

/*
  AuthController
  - Define el endpoint de login para que los usuarios puedan autenticarse con su email y password.
  - Utiliza el AuthService para manejar la lógica de autenticación y generación del token JWT.
  - Valida la request utilizando el DTO de LoginDto
*/

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion con email y password' })
  @ApiResponse({ status: 201, description: 'JWT generado correctamente' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
