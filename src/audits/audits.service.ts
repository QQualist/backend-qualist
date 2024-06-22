import { Injectable, NotFoundException } from '@nestjs/common';
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

  async remove(uuid: string) {
    const auditExists = await this.auditRepo.findOneBy({ uuid });

    if (!auditExists) {
      throw new NotFoundException('Audit not found');
    }

    await this.auditRepo.softDelete({ uuid });
  }

  async restore(uuid: string) {
    const auditExists = await this.auditRepo.findOne({
      relations: {
        audit_status: true,
      },
      where: { uuid },
      withDeleted: true,
    });

    if (!auditExists) {
      throw new NotFoundException('Audit not found');
    }

    if (!auditExists.deletedAt) {
      throw new NotFoundException('Audit is not deleted');
    }

    await this.auditRepo.restore({ uuid });
    return auditExists;
  }
}
