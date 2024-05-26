import { PartialType } from '@nestjs/swagger';
import { CreateChecklistDto } from './create-checklist.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChecklistDto extends PartialType(CreateChecklistDto) {
  @IsBoolean()
  @IsOptional()
  active: boolean; //Default value is TRUE
}
