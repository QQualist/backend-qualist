import { Injectable } from '@nestjs/common';
import { CreateItemStatusDto } from './dto/create-item_status.dto';
import { UpdateItemStatusDto } from './dto/update-item_status.dto';

@Injectable()
export class ItemStatusService {
  create(createItemStatusDto: CreateItemStatusDto) {
    return 'This action adds a new itemStatus';
  }

  findAll() {
    return `This action returns all itemStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemStatus`;
  }

  update(id: number, updateItemStatusDto: UpdateItemStatusDto) {
    return `This action updates a #${id} itemStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemStatus`;
  }
}
