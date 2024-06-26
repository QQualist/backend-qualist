import { Test, TestingModule } from '@nestjs/testing';
import { ItemStatusService } from './item_status.service';

describe('ItemStatusService', () => {
  let service: ItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemStatusService],
    }).compile();

    service = module.get<ItemStatusService>(ItemStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
