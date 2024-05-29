import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
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
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const risk_type = await this.riskTypesService.findOne(+id);
      return response.status(HttpStatus.OK).send(risk_type);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
