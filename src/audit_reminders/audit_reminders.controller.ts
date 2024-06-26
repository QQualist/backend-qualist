import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  HttpStatus,
  Res,
  HttpException,
} from '@nestjs/common';
import { AuditRemindersService } from './audit_reminders.service';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';
import { Observable } from 'rxjs';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ValidationPipe } from '../validation.pipe';

@Controller('audit-reminders')
export class AuditRemindersController {
  constructor(private readonly auditRemindersService: AuditRemindersService) {}

  @Sse('event')
  @IsPublic()
  sendEvent(): Observable<MessageEvent> {
    return this.auditRemindersService.getSseEvents();
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    createAuditReminderDto: CreateAuditReminderDto[],
    @Res() response: Response,
  ) {
    try {
      const audit_reminder = await this.auditRemindersService.create(
        createAuditReminderDto,
      );
      return response.status(HttpStatus.NO_CONTENT).send(audit_reminder);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/audits/:audit_uuid')
  @ApiOperation({ summary: 'Find all reminders by audit_uuid' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reminders found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized to do the operation.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'audit_uuid', description: 'UUID of the audit' })
  async findAll(
    @Param('audit_uuid') audit_uuid: string,
    @Res() response: Response,
  ) {
    try {
      const reminders = await this.auditRemindersService.findAll(audit_uuid);
      return response.status(HttpStatus.OK).send(reminders);
    } catch (error) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditRemindersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuditReminderDto: UpdateAuditReminderDto,
  ) {
    return this.auditRemindersService.update(+id, updateAuditReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditRemindersService.remove(+id);
  }
}
