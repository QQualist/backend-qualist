import { PartialType } from '@nestjs/swagger';
import { CreateAuditStatusDto } from './create-audit_status.dto';

export class UpdateAuditStatusDto extends PartialType(CreateAuditStatusDto) {}
