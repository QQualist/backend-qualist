import { Injectable, Logger } from '@nestjs/common';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditReminder } from './entities/audit_reminder.entity';
import { Repository } from 'typeorm';
import { Observable, Subject } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuditRemindersService {
  private readonly logger = new Logger(AuditRemindersService.name);
  private sseSubject = new Subject<MessageEvent>();

  constructor(
    @InjectRepository(AuditReminder)
    private readonly auditReminderRepo: Repository<AuditReminder>,
  ) {}

  getSseEvents(): Observable<MessageEvent> {
    return this.sseSubject.asObservable();
  }

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

  @Cron(CronExpression.EVERY_SECOND)
  async checkReminders() {
    const currentDate = new Date();
    const reminders = await this.auditReminderRepo.find({
      relations: {
        audit: true,
        reminder: true,
      },
      where: {
        notificationSentAt: null,
        audit: {
          deletedAt: null,
        },
      },
    });

    reminders.forEach((reminder) => {
      const auditDate = reminder.audit.date;
      const reminderTime = reminder.reminder.time;

      const differenceInSeconds = Math.floor(
        (auditDate.getTime() - currentDate.getTime()) / 1000,
      );

      if (differenceInSeconds <= reminderTime && !reminder.notificationSentAt) {
        const event = new MessageEvent('AUDIT_REMINDER', {
          data: JSON.stringify({
            type: 'AUDIT_REMINDER',
            auditName: reminder.audit.name,
            remainingTime: reminder.reminder.time,
            message: `Audit coming soon.`,
          }),
        });

        this.sseSubject.next(event);

        this.auditReminderRepo.update(reminder.id, {
          notificationSentAt: new Date(),
        });
      }
    });
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
