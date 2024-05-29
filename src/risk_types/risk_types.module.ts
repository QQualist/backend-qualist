import { Module } from '@nestjs/common';
import { RiskTypesService } from './risk_types.service';
import { RiskTypesController } from './risk_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskType } from './entities/risk_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskType])],
  controllers: [RiskTypesController],
  providers: [RiskTypesService],
})
export class RiskTypesModule {}
