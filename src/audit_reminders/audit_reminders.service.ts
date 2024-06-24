import { Injectable } from '@nestjs/common';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';

@Injectable()
export class AuditRemindersService {
  create(createAuditReminderDto: CreateAuditReminderDto) {
    return 'This action adds a new auditReminder';
  }

  findAll() {
    return `This action returns all auditReminders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditReminder`;
  }

  update(id: number, updateAuditReminderDto: UpdateAuditReminderDto) {
    return `This action updates a #${id} auditReminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditReminder`;
  }
}
