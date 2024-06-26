import { Test, TestingModule } from '@nestjs/testing';
import { ItemStatusService } from './item_status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemStatus } from './entities/item_status.entity';

describe('ItemStatusService', () => {
  let service: ItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemStatusService,
        {
          provide: getRepositoryToken(ItemStatus),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ItemStatusService>(ItemStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
