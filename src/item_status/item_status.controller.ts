import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ItemStatusService } from './item_status.service';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('item-status')
@ApiTags('Item Status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Find all status of items' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status of items found.',
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
      const item_status = await this.itemStatusService.findAll();
      return response.status(HttpStatus.OK).send(item_status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemStatusService.findOne(+id);
  }
}
