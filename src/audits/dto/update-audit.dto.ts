import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuditDto } from './create-audit.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateAuditDto extends PartialType(CreateAuditDto) {
  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'Audit status ID', required: true })
  audit_status_id: string;
}
