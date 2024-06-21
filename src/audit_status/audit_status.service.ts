import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditStatus } from './entities/audit_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditStatusService {
  constructor(
    @InjectRepository(AuditStatus)
    private readonly auditStatusRepo: Repository<AuditStatus>,
  ) {}

  async seed() {
    const count = await this.auditStatusRepo.count();
    if (count === 0) {
      await this.auditStatusRepo.save([
        { name: 'CREATED' },
        { name: 'COMPLETED' },
        { name: 'DELAYED' },
        { name: 'CANCELED' },
      ]);
    }
  }

  findAll() {
    return `This action returns all auditStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditStatus`;
  }
}
