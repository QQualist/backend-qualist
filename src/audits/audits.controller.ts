import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new audit' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The audit has been successfully scheduled.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiBody({ type: CreateAuditDto })
  async create(
    @Body(new ValidationPipe()) createAuditDto: CreateAuditDto,
    @Res() response: Response,
  ) {
    try {
      const audit = await this.auditsService.create(createAuditDto);
      return response.status(HttpStatus.CREATED).send(audit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditDto: UpdateAuditDto) {
    return this.auditsService.update(+id, updateAuditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditsService.remove(+id);
  }
}
