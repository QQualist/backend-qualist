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
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createItemDto: CreateItemDto,
    @Res() response: Response,
  ) {
    try {
      const item = await this.itemsService.create(createItemDto);
      return response.status(HttpStatus.CREATED).send(item);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/checklist/:checklist_uuid')
  async findAll(
    @Param('checklist_uuid') checklist_uuid: string,
    @Res() response: Response,
  ) {
    try {
      const items = await this.itemsService.findAll(checklist_uuid);
      return response.status(HttpStatus.OK).send(items);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const item = await this.itemsService.findOne(uuid);
      return response.status(HttpStatus.OK).send(item);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      await this.itemsService.remove(uuid);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
