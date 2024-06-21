import { Module } from '@nestjs/common';
import { AuditStatusService } from './audit_status.service';
import { AuditStatusController } from './audit_status.controller';

@Module({
  controllers: [AuditStatusController],
  providers: [AuditStatusService],
})
export class AuditStatusModule {}
