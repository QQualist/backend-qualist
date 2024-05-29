import { Module } from '@nestjs/common';
import { RiskTypesService } from './risk_types.service';
import { RiskTypesController } from './risk_types.controller';

@Module({
  controllers: [RiskTypesController],
  providers: [RiskTypesService],
})
export class RiskTypesModule {}
