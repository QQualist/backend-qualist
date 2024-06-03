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
  UnauthorizedException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';
@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createChecklistDto: CreateChecklistDto,
    @Res() response: Response,
  ) {
    try {
      const checklist = await this.checklistsService.create(createChecklistDto);
      return response.status(HttpStatus.CREATED).send(checklist);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    const checklists = await this.checklistsService.findAll();
    return response.status(HttpStatus.OK).send(checklists);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const checklist = await this.checklistsService.findOne(uuid);
      return response.status(HttpStatus.OK).send(checklist);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body(new ValidationPipe()) updateChecklistDto: UpdateChecklistDto,
    @Res() response: Response,
  ) {
    try {
      const checklist = await this.checklistsService.update(
        uuid,
        updateChecklistDto,
      );
      return response.status(HttpStatus.OK).send(checklist);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      await this.checklistsService.remove(uuid);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
