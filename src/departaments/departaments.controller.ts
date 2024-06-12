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
import { DepartamentsService } from './departaments.service';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
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

@Controller('departaments')
@ApiTags('Departaments')
export class DepartamentsController {
  constructor(private readonly departamentsService: DepartamentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new departament' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The departament has been successfully created.',
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
  @ApiBody({ type: CreateDepartamentDto })
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
  @ApiOperation({ summary: 'Find all departaments' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departaments found',
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
      const departaments = await this.departamentsService.findAll();
      return response.status(HttpStatus.OK).send(departaments);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find one departament by UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Departament found by his UUID',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiParam({ name: 'uuid', description: 'UUID of the departament' })
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const departament = await this.departamentsService.findOne(uuid);
      return response.status(HttpStatus.OK).send(departament);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Updates the departament by UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated departament.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Departament not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiParam({ name: 'uuid', description: 'UUID of the departament' })
  @ApiBody({ type: UpdateDepartamentDto })
  async update(
    @Param('uuid') uuid: string,
    @Body(new ValidationPipe()) updateDepartamentDto: UpdateDepartamentDto,
    @Res() response: Response,
  ) {
    try {
      const departament = await this.departamentsService.update(
        uuid,
        updateDepartamentDto,
      );
      return response.status(HttpStatus.OK).send(departament);
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
    return this.departamentsService.remove(+id);
  }
}
