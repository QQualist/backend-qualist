import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = this.itemRepo.create({
      ...createItemDto,
      risk_type: { id: createItemDto.risk_type_id },
      priority: { uuid: createItemDto.priority_uuid },
      checklist: { uuid: createItemDto.checklist_uuid },
    });

    return await this.itemRepo.save(createdItem);
  }

  findAll() {
    return `This action returns all items`;
  }

  async findOne(uuid: string) {
    return this.itemRepo.findOneBy({
      uuid,
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
