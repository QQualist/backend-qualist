import { Module } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { AuditRemindersService } from '../audit_reminders/audit_reminders.service';
import { AuditReminder } from '../audit_reminders/entities/audit_reminder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audit, AuditReminder])],
  controllers: [AuditsController],
  providers: [AuditsService, AuditRemindersService],
})
export class AuditsModule {}
