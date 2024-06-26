import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemStatusService } from './item_status.service';
import { CreateItemStatusDto } from './dto/create-item_status.dto';
import { UpdateItemStatusDto } from './dto/update-item_status.dto';

@Controller('item-status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Post()
  create(@Body() createItemStatusDto: CreateItemStatusDto) {
    return this.itemStatusService.create(createItemStatusDto);
  }

  @Get()
  findAll() {
    return this.itemStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemStatusDto: UpdateItemStatusDto) {
    return this.itemStatusService.update(+id, updateItemStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemStatusService.remove(+id);
  }
}
