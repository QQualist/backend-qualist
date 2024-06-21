import { Controller, Get, Param } from '@nestjs/common';
import { AuditStatusService } from './audit_status.service';

@Controller('audit-status')
export class AuditStatusController {
  constructor(private readonly auditStatusService: AuditStatusService) {}

  @Get()
  findAll() {
    return this.auditStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditStatusService.findOne(+id);
  }
}
