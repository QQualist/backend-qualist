import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskType } from './entities/risk-type.entity';

@Injectable()
export class RiskTypeSeedService {
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
}