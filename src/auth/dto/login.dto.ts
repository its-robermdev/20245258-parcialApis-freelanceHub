import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/*
  LoginDto
  - Valida la request de login para asegurarse de que el email y la contraseña sean proporcionados y tengan el formato correcto (email para email y string para contraseña).
*/

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
