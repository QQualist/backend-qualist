import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartamentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25, { message: 'The departament name is too long' })
  @ApiProperty({ description: 'The department name' })
  name: string;
}
