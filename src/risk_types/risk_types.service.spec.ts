import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypesService } from './risk_types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RiskType } from './entities/risk_type.entity';

describe('RiskTypesService', () => {
  let service: RiskTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiskTypesService,
        {
          provide: getRepositoryToken(RiskType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RiskTypesService>(RiskTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
