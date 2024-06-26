import { Module } from '@nestjs/common';
import { ItemStatusService } from './item_status.service';
import { ItemStatusController } from './item_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemStatus } from './entities/item_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemStatus])],
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
})
export class ItemStatusModule {}
