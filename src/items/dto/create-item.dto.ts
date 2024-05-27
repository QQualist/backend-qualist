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
  description: string;

  @IsString()
  @MaxLength(255, { message: 'Risk is too long' })
  @IsOptional()
  risk: string | undefined;

  @IsNumber()
  @IsInt()
  @IsOptional()
  risk_type_id: number | undefined;

  @IsString()
  @IsUUID()
  checklist_uuid: string;

  @IsString()
  @IsUUID()
  priority_uuid: string;
}
