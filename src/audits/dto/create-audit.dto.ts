import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFutureDate } from '../decorators/is-future-date';

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
}
