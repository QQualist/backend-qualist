import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateChecklistDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Checklist name is too long' })
  name: string;

  @IsString()
  @IsUUID()
  user_uuid: string;
}
