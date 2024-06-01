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
  name: string;

  @IsNumber()
  @IsInt()
  deadline: number;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  @MaxLength(7, { message: 'Hex color is too long' })
  color: string;
}
