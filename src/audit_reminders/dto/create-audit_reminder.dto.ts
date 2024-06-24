import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateAuditReminderDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @MinLength(1, { message: 'Audit uuid is required' })
  @ApiProperty({ description: 'Audit uuid' })
  audit_uuid: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Reminder id' })
  reminder_id: number;
}
