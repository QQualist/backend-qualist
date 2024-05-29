import { Controller, Get, Param } from '@nestjs/common';
import { RiskTypesService } from './risk_types.service';

@Controller('risk-types')
export class RiskTypesController {
  constructor(private readonly riskTypesService: RiskTypesService) {}

  @Get()
  findAll() {
    return this.riskTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskTypesService.findOne(+id);
  }
}
