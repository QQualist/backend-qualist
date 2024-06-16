import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserType } from '../user_types/entities/user-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskTypesService } from '../risk_types/risk_types.service';
import { RiskType } from '../risk_types/entities/risk_type.entity';
import { UserTypesService } from '../user_types/user_types.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserType, RiskType])],
  providers: [SeederService, UserTypesService, RiskTypesService],
  exports: [SeederService],
})
export class SeedModule {}
