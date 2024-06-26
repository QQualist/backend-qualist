import { Controller, Get, Param } from '@nestjs/common';
import { ItemStatusService } from './item_status.service';

@Controller('item-status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Get()
  findAll() {
    return this.itemStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemStatusService.findOne(+id);
  }
}
