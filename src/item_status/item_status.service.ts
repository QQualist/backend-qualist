import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemStatus } from './entities/item_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemStatusService {
  constructor(
    @InjectRepository(ItemStatus)
    private readonly itemStatusRepo: Repository<ItemStatus>,
  ) {}

  async seed() {
    const count = await this.itemStatusRepo.count();
    if (count === 0) {
      await this.itemStatusRepo.save([
        { name: 'UNAUDITED' },
        { name: 'COMPLIANT' },
        { name: 'NON-COMPLIANT' },
        { name: 'INAPPLICABLE' },
        { name: 'OPEN' },
        { name: 'STAGGERED' },
        { name: 'RESOLVED' },
        { name: 'WAIVED' },
        { name: 'CLOSED' },
      ]);
    }
  }

  findAll() {
    return `This action returns all itemStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemStatus`;
  }
}
