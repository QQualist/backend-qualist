import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypesController } from './risk_types.controller';
import { RiskTypesService } from './risk_types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RiskType } from './entities/risk_type.entity';

describe('RiskTypesController', () => {
  let controller: RiskTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskTypesController],
      providers: [
        RiskTypesService,
        {
          provide: getRepositoryToken(RiskType),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RiskTypesController>(RiskTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
