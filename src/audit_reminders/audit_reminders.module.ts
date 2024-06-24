import { Module } from '@nestjs/common';
import { AuditRemindersService } from './audit_reminders.service';
import { AuditRemindersController } from './audit_reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditReminder } from './entities/audit_reminder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditReminder])],
  controllers: [AuditRemindersController],
  providers: [AuditRemindersService],
})
export class AuditRemindersModule {}
