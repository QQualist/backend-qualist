import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreatePriorityDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Priority name is too long' })
  @ApiProperty({ description: 'The priority name' })
  name: string;

  @IsNumber()
  @IsInt()
  @ApiProperty({
    description:
      'The item that is related to the priority and becomes a non-conformity will have this deadline to be resolved. The deadline is given in days, but transformed into seconds',
  })
  deadline: number;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  @MaxLength(7, { message: 'Hex color is too long' })
  @ApiProperty({ description: 'Hexadecimal color to represent priority' })
  color: string;
}
