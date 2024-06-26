import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponsibleDto extends CreateUserDto {
  @IsOptional()
  password: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Department to which the responsible belongs',
    required: true,
  })
  departament_uuid: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role that the user has',
    required: true,
  })
  role_uuid: string;
}
