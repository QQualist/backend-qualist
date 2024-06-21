import { Injectable } from '@nestjs/common';
import { CreateAuditStatusDto } from './dto/create-audit_status.dto';
import { UpdateAuditStatusDto } from './dto/update-audit_status.dto';

@Injectable()
export class AuditStatusService {
  create(createAuditStatusDto: CreateAuditStatusDto) {
    return 'This action adds a new auditStatus';
  }

  findAll() {
    return `This action returns all auditStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditStatus`;
  }

  update(id: number, updateAuditStatusDto: UpdateAuditStatusDto) {
    return `This action updates a #${id} auditStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditStatus`;
  }
}
