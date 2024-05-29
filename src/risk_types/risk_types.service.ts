import { Injectable } from '@nestjs/common';
import { CreateRiskTypeDto } from './dto/create-risk_type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk_type.dto';

@Injectable()
export class RiskTypesService {
  create(createRiskTypeDto: CreateRiskTypeDto) {
    return 'This action adds a new riskType';
  }

  findAll() {
    return `This action returns all riskTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} riskType`;
  }

  update(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    return `This action updates a #${id} riskType`;
  }

  remove(id: number) {
    return `This action removes a #${id} riskType`;
  }
}
