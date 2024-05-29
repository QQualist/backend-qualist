import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserTypeSeedService } from './user-type-seed.service';
import { UserType } from './entities/user-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskTypesService } from '../risk_types/risk_types.service';
import { RiskType } from '../risk_types/entities/risk_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserType, RiskType])],
  providers: [SeederService, UserTypeSeedService, RiskTypesService],
  exports: [SeederService],
})
export class SeedModule {}
