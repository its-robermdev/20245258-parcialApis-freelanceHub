import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

/*
  AuthService
  - Proporciona el método de login para autenticar a los usuarios y generar un token JWT si las credenciales son válidas.
  - Utiliza el UsersService para buscar al usuario por correo electrónico y validar su contraseña.
*/

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /*
    Función de login que autentica a un usuario con su email y password.
    @param email → El correo electrónico del usuario que intenta iniciar sesión.
    @param password → La contraseña del usuario que intenta iniciar sesión.
    @returns Un objeto con el token JWT si las credenciales son válidas, o lanza una excepción de 401 unauthorized si no lo son.
  */
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // Si el usuario no existe o la contraseña no coincide, tira una excepción de 401 unauthorized
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    // De lo contrario, genera un token JWT con el ID y el email del usuario como payload y lo devuelve
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
