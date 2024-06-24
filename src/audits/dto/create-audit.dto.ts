import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFutureDate } from '../decorators/is-future-date';
import { AuditReminder } from 'src/audit_reminders/entities/audit_reminder.entity';
import { CreateAuditReminderDto } from 'src/audit_reminders/dto/create-audit_reminder.dto';

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Audit name is required' })
  @MaxLength(50, { message: 'Audit name is too long' })
  @ApiProperty({ description: 'Audit name' })
  name: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @IsFutureDate({
    message: 'Date must be equal to or greater than the current date',
  })
  @ApiProperty({ description: 'Date and time of the scheduled audit' })
  date: string;

  @IsArray()
  @IsOptional()
  reminders?: CreateAuditReminderDto[];
}
