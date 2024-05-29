import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskTypesService } from './risk_types.service';
import { CreateRiskTypeDto } from './dto/create-risk_type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk_type.dto';

@Controller('risk-types')
export class RiskTypesController {
  constructor(private readonly riskTypesService: RiskTypesService) {}

  @Post()
  create(@Body() createRiskTypeDto: CreateRiskTypeDto) {
    return this.riskTypesService.create(createRiskTypeDto);
  }

  @Get()
  findAll() {
    return this.riskTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskTypeDto: UpdateRiskTypeDto) {
    return this.riskTypesService.update(+id, updateRiskTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskTypesService.remove(+id);
  }
}
