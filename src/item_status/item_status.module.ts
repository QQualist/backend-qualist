import { Module } from '@nestjs/common';
import { ItemStatusService } from './item_status.service';
import { ItemStatusController } from './item_status.controller';

@Module({
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
})
export class ItemStatusModule {}
