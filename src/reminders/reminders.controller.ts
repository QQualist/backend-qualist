import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get()
  @ApiOperation({ summary: 'Find all reminders' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reminders found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  async findAll(@Res() response: Response) {
    try {
      const reminders = await this.remindersService.findAll();
      return response.status(HttpStatus.OK).send(reminders);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.remindersService.findOne(id);
  }
}
