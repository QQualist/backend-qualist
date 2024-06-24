import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserType } from '../user_types/entities/user-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskTypesService } from '../risk_types/risk_types.service';
import { RiskType } from '../risk_types/entities/risk_type.entity';
import { UserTypesService } from '../user_types/user_types.service';
import { AuditStatusService } from '../audit_status/audit_status.service';
import { AuditStatus } from '../audit_status/entities/audit_status.entity';
import { RemindersService } from '../reminders/reminders.service';
import { Reminder } from '../reminders/entities/reminder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserType, RiskType, AuditStatus, Reminder]),
  ],
  providers: [
    SeederService,
    UserTypesService,
    RiskTypesService,
    AuditStatusService,
    RemindersService,
  ],
  exports: [SeederService],
})
export class SeedModule {}
