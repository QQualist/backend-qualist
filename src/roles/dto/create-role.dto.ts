import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25, { message: 'Priority name is too long' })
  @ApiProperty({
    description: 'Name of the role',
    required: true,
  })
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description:
      'Informs whether the user has permission to waive a non-conformity',
    required: false,
  })
  canDispenseNonConformities: boolean;
}
