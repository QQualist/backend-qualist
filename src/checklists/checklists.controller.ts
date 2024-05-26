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
  findAll() {
    return this.checklistsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.checklistsService.findOne(uuid);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ) {
    return this.checklistsService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistsService.remove(+id);
  }
}
