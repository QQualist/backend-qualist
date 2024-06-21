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
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { ValidationPipe } from '../validation.pipe';
import { Response } from 'express';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('responsibles')
@ApiTags('responsibles')
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new responsible' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The responsible has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiBody({ type: CreateResponsibleDto })
  async create(
    @Body(new ValidationPipe()) createResponsibleDto: CreateResponsibleDto,
    @Res() response: Response,
  ) {
    try {
      const responsible =
        await this.responsiblesService.create(createResponsibleDto);
      return response.status(HttpStatus.CREATED).send(responsible);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/departament/:departament_uuid')
  @ApiOperation({ summary: 'Find all responsibles by departament UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Responsibles found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiParam({
    name: 'departament_uuid',
    description: 'UUID of the departament',
  })
  async findAll(
    @Param('departament_uuid') departament_uuid: string,
    @Res() response: Response,
  ) {
    try {
      const responsibles =
        await this.responsiblesService.findAll(departament_uuid);

      return response.status(HttpStatus.OK).send(responsibles);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.responsiblesService.findOne(+id);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a responsible' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated responsible.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiBody({ type: UpdateResponsibleDto })
  @ApiParam({ name: 'uuid', description: 'UUID of the responsible' })
  async update(
    @Param('uuid') uuid: string,
    @Body(new ValidationPipe()) updateResponsibleDto: UpdateResponsibleDto,
    @Res() response: Response,
  ) {
    try {
      const responsible = await this.responsiblesService.update(
        uuid,
        updateResponsibleDto,
      );
      return response.status(HttpStatus.OK).send(responsible);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.responsiblesService.remove(+id);
  }
}
