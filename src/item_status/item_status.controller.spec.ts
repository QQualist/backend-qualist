import { Test, TestingModule } from '@nestjs/testing';
import { ItemStatusController } from './item_status.controller';
import { ItemStatusService } from './item_status.service';

describe('ItemStatusController', () => {
  let controller: ItemStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemStatusController],
      providers: [ItemStatusService],
    }).compile();

    controller = module.get<ItemStatusController>(ItemStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
