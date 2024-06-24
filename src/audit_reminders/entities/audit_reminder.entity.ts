import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Audit } from '../../audits/entities/audit.entity';
import { Reminder } from '../../reminders/entities/reminder.entity';

@Entity({ name: 'audit_reminders' })
@Unique(['audit', 'reminder'])
export class AuditReminder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Audit, (audit) => audit.uuid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'audit_uuid' })
  audit: Audit;

  @ManyToOne(() => Reminder, (reminder) => reminder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'reminder_id' })
  reminder: Reminder;

  @Column({ type: 'datetime', precision: 0, default: null, nullable: true })
  notificationSentAt: Date;
}
