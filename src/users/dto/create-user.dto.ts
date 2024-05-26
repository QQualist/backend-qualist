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
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'User surname is too long' })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(60, { message: 'User email is too long' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  canChangeQa: boolean;

  @IsBoolean()
  @IsOptional()
  sendNonConformitiesToEmail: boolean;

  @IsString()
  @IsUUID()
  @IsOptional()
  departament_uuid: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  creator_uuid: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  role_uuid: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  type_id: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  superior_uuid: string;
}
