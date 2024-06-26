import { Test, TestingModule } from '@nestjs/testing';
import { ItemStatusController } from './item_status.controller';
import { ItemStatusService } from './item_status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemStatus } from './entities/item_status.entity';

describe('ItemStatusController', () => {
  let controller: ItemStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemStatusController],
      providers: [
        ItemStatusService,
        {
          provide: getRepositoryToken(ItemStatus),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ItemStatusController>(ItemStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
