import { PartialType } from '@nestjs/swagger';
import { CreateAuditReminderDto } from './create-audit_reminder.dto';

export class UpdateAuditReminderDto extends PartialType(CreateAuditReminderDto) {}
