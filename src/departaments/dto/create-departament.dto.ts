import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartamentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25, { message: 'The departament name is too long' })
  name: string;
}
