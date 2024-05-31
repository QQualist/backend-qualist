import { Injectable, NotFoundException } from '@nestjs/common';
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

    const savedItem = await this.itemRepo.save(createdItem);

    // Fetch the saved items with relations
    return this.itemRepo.findOne({
      where: { uuid: savedItem.uuid },
      relations: {
        checklist: true,
        risk_type: true,
        priority: true,
      }
    })
  }

  async findAll(checklist_uuid: string) {
    return await this.itemRepo.find({
      where: {
        checklist: { uuid: checklist_uuid },
      },
      relations: {
        checklist: true,
        risk_type: true,
        priority: true,
      },
    });
  }

  async findOne(uuid: string) {
    return this.itemRepo.findOneBy({
      uuid,
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(uuid: string) {
    const itemExists = await this.itemRepo.existsBy({ uuid });

    if (!itemExists) {
      throw new NotFoundException('Item not found');
    }

    await this.itemRepo.softDelete({ uuid });
  }
}
