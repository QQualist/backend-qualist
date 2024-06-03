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
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@Controller('checklists')
@ApiTags('Checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a checklist' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The checklist has been successfully created.',
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
  @ApiBody({ type: CreateChecklistDto })
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
  @ApiOperation({ summary: 'Find all checklists' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checklists found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  async findAll(@Res() response: Response) {
    const checklists = await this.checklistsService.findAll();
    return response.status(HttpStatus.OK).send(checklists);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find one checklist by UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checklist found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiParam({ name: 'uuid', description: 'UUID of the checklist' })
  async findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    try {
      const checklist = await this.checklistsService.findOne(uuid);
      return response.status(HttpStatus.OK).send(checklist);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Updates the checklist by UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated checklist.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Checklist not found.',
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
  @ApiParam({ name: 'uuid', description: 'UUID of the checklist' })
  @ApiBody({ type: UpdateChecklistDto })
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
  @ApiOperation({ summary: 'Delete the checklist by UUID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted checklist.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Checklist not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiParam({ name: 'uuid', description: 'UUID of the checklist' })
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
