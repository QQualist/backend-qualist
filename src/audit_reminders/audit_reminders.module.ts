import { Module } from '@nestjs/common';
import { AuditRemindersService } from './audit_reminders.service';
import { AuditRemindersController } from './audit_reminders.controller';

@Module({
  controllers: [AuditRemindersController],
  providers: [AuditRemindersService],
})
export class AuditRemindersModule {}
