import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/*
  LoginDto
  - Valida la request de login para asegurarse de que el email y la contraseña sean proporcionados y tengan el formato correcto (email para email y string para contraseña).
*/

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@correo.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Contraseña de acceso del usuario',
    example: 'MiClave123',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
