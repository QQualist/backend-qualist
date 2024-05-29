import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskType } from './entities/risk_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskTypesService {
  constructor(
    @InjectRepository(RiskType)
    private readonly riskTypeRepo: Repository<RiskType>,
  ) {}

  async seed() {
    const count = await this.riskTypeRepo.count();
    if (count === 0) {
      await this.riskTypeRepo.save([
        { name: 'COMMUNICATION' },
        { name: 'COST' },
        { name: 'ENVIRONMENTAL AND REGULATORY' },
        { name: 'HUMAN RESOURCES' },
        { name: 'OUTSOURCING' },
        { name: 'QUALITY' },
        { name: 'SCOPE' },
        { name: 'SECURITY' },
        { name: 'TECHNOLOGY' },
        { name: 'TIMETABLE' },
      ]);
    }
  }

  async findAll() {
    return await this.riskTypeRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} riskType`;
  }
}
