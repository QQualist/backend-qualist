import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'User name is too long' })
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'User surname is too long' })
  @ApiProperty({ description: 'The surname of the user' })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(60, { message: 'User email is too long' })
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'User allowed to change a QA of their assignments',
  })
  canChangeQa: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'User wishes to receive non-conformities in their email',
  })
  sendNonConformitiesToEmail: boolean;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Department to which the user belongs',
    required: false,
  })
  departament_uuid: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Role that the user has',
    required: false,
  })
  role_uuid: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The type of user' })
  type_id: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: "The user's superior", required: false })
  superior_uuid: string;
}
