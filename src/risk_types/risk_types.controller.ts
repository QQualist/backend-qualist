import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { RiskTypesService } from './risk_types.service';
import { Response } from 'express';

@Controller('risk-types')
export class RiskTypesController {
  constructor(private readonly riskTypesService: RiskTypesService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const riskTypes = await this.riskTypesService.findAll();
      return response.status(HttpStatus.OK).send(riskTypes);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskTypesService.findOne(+id);
  }
}
