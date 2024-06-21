import { Module } from '@nestjs/common';
import { AuditStatusService } from './audit_status.service';
import { AuditStatusController } from './audit_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditStatus } from './entities/audit_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditStatus])],
  controllers: [AuditStatusController],
  providers: [AuditStatusService],
})
export class AuditStatusModule {}
