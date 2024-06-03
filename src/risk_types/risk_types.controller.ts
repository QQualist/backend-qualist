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
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('risk-types')
@ApiTags('Types of risk')
export class RiskTypesController {
  constructor(private readonly riskTypesService: RiskTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all types of risk' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Types of risk found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findAll(@Res() response: Response) {
    try {
      const riskTypes = await this.riskTypesService.findAll();
      return response.status(HttpStatus.OK).send(riskTypes);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one type of risk by ID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Type of risk found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', description: 'ID of the risk of type' })
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
