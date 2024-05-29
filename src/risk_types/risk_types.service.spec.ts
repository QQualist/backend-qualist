import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypesService } from './risk_types.service';

describe('RiskTypesService', () => {
  let service: RiskTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskTypesService],
    }).compile();

    service = module.get<RiskTypesService>(RiskTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
