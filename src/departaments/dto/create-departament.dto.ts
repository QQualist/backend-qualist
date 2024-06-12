import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDepartamentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'The department name must contain at least 1 character',
  })
  @MaxLength(35, { message: 'The departament name is too long' })
  @ApiProperty({ description: 'The department name' })
  name: string;
}
