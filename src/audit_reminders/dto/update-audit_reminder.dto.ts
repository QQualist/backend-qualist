import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuditReminderDto } from './create-audit_reminder.dto';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuditReminderDto extends PartialType(
  CreateAuditReminderDto,
) {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ description: 'Date and time the notification was sent' })
  date: Date;
}
