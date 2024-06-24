import { Injectable } from '@nestjs/common';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditReminder } from './entities/audit_reminder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditRemindersService {
  constructor(
    @InjectRepository(AuditReminder)
    private readonly auditReminderRepo: Repository<AuditReminder>,
  ) {}

  async create(createAuditReminderDto: CreateAuditReminderDto[]) {
    // Iterate over each provided auditReminder data and create a new AuditReminder entity
    for (const auditReminderData of createAuditReminderDto) {
      const auditReminderExists = await this.auditReminderRepo.findOneBy({
        audit: { uuid: auditReminderData.audit_uuid },
        reminder: { id: auditReminderData.reminder_id },
      });

      if (!auditReminderExists) {
        const createdAuditReminder = this.auditReminderRepo.create({
          audit: { uuid: auditReminderData.audit_uuid },
          reminder: { id: auditReminderData.reminder_id },
        });

        await this.auditReminderRepo.save(createdAuditReminder);
      }
    }
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
