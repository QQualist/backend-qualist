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
  NotFoundException,
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

  @Get('/user/:user_uuid')
  async findAll(
    @Param('user_uuid') user_uuid: string,
    @Res() response: Response,
  ) {
    try {
      const priorities = await this.prioritiesService.findAll(user_uuid);
      return response.status(HttpStatus.OK).send(priorities);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const priority = await this.prioritiesService.findOne(uuid);
      return response.status(HttpStatus.OK).send(priority);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body(new ValidationPipe()) updatePriorityDto: UpdatePriorityDto,
    @Res() response: Response,
  ) {
    try {
      const priority = await this.prioritiesService.update(
        uuid,
        updatePriorityDto,
      );
      return response.status(HttpStatus.OK).send(priority);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioritiesService.remove(+id);
  }
}
