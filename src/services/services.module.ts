import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { PublicController } from './public.controller';
import { Service } from './service.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), UsersModule],
  controllers: [ServicesController, PublicController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
