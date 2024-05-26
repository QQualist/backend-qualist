import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserTypeSeedService } from './user-type-seed.service';
import { RiskType } from './entities/risk-type.entity';
import { UserType } from './entities/user-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskTypeSeedService } from './risk-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([RiskType, UserType])],
  providers: [SeederService, RiskTypeSeedService, UserTypeSeedService],
  exports: [SeederService],
})
export class SeedModule {}
