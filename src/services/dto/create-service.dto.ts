import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/*
  CreateServiceDto
  - Valida la request para crear un nuevo servicio
  - Se asegura de que el título, la categoría y el precio sean proporcionados y tengan el formato correcto (string para título y categoría, number para precio).
*/

export class CreateServiceDto {
  @ApiProperty({
    description: 'Título del servicio publicado',
    example: 'Diseño de logo profesional',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del servicio',
    example: 'Incluye tres propuestas y dos rondas de cambios.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Categoria a la que pertenece el servicio',
    example: 'Diseño grafico',
  })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 150,
  })
  @Type(() => Number)
  @IsNumber()
  price!: number;
}
