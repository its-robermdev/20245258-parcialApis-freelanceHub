import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/*
  CreateServiceDto
  - Valida la request para crear un nuevo servicio
  - Se asegura de que el título, la categoría y el precio sean proporcionados y tengan el formato correcto (string para título y categoría, number para precio).
*/

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @Type(() => Number)
  @IsNumber()
  price!: number;
}
