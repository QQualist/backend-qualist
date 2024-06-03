import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'Description item is too long' })
  @ApiProperty({ description: 'Description of the item.' })
  description: string;

  @IsString()
  @MaxLength(255, { message: 'Risk is too long' })
  @IsOptional()
  @ApiProperty({ description: 'Text about the risk, if any.', required: false })
  risk: string | undefined;

  @IsNumber()
  @IsInt()
  @IsOptional()
  @ApiProperty({ description: 'Risk ID, if any.', required: false })
  risk_type_id: number | undefined;

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'UUID of the checklist to which the item belongs',
  })
  checklist_uuid: string;

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: "UUID of the item's priority",
  })
  priority_uuid: string;
}
