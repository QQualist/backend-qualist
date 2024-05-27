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
  UnauthorizedException,
} from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';

@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createPriorityDto: CreatePriorityDto,
    @Res() response: Response,
  ) {
    try {
      const priority = await this.prioritiesService.create(createPriorityDto);
      return response.status(HttpStatus.CREATED).send(priority);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prioritiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.prioritiesService.update(+id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioritiesService.remove(+id);
  }
}
