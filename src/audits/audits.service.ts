import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditsService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepo: Repository<Audit>,
  ) {}

  async create(createAuditDto: CreateAuditDto) {
    const createAudit = this.auditRepo.create({
      ...createAuditDto,
      audit_status: { id: 1 }, // 1 = CREATED
    });

    const audit = await this.auditRepo.save(createAudit);

    return audit;
  }

  async findAll() {
    return await this.auditRepo.find({
      relations: {
        audit_status: true,
      },
      order: {
        date: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }

  update(id: number, updateAuditDto: UpdateAuditDto) {
    return `This action updates a #${id} audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} audit`;
  }
}
