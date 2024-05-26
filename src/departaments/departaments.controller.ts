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
import { DepartamentsService } from './departaments.service';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';

@Controller('departaments')
export class DepartamentsController {
  constructor(private readonly departamentsService: DepartamentsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createDepartamentDto: CreateDepartamentDto,
    @Res() response: Response,
  ) {
    try {
      const departament =
        await this.departamentsService.create(createDepartamentDto);
      return response.status(HttpStatus.CREATED).send(departament);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.departamentsService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const departament = await this.departamentsService.findOne(uuid);
      return response.status(HttpStatus.OK).send(departament);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartamentDto: UpdateDepartamentDto,
  ) {
    return this.departamentsService.update(+id, updateDepartamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentsService.remove(+id);
  }
}
