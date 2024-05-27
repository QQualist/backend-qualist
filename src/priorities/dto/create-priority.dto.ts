import {
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
  name: string;

  @IsNumber()
  @IsInt()
  deadline: number;

  @IsString()
  @IsUUID()
  user_uuid: string;
}
