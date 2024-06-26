import { Module } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { PrioritiesController } from './priorities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { UsersModule } from '../users/users.module';
import { Item } from '../items/entities/item.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Priority, Item])],
  controllers: [PrioritiesController],
  providers: [PrioritiesService],
})
export class PrioritiesModule {}
