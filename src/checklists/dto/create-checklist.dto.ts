import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChecklistDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Checklist name is too long' })
  name: string;
}
