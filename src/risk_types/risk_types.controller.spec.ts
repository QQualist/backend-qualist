import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypesController } from './risk_types.controller';
import { RiskTypesService } from './risk_types.service';

describe('RiskTypesController', () => {
  let controller: RiskTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskTypesController],
      providers: [RiskTypesService],
    }).compile();

    controller = module.get<RiskTypesController>(RiskTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
