import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { AuditRemindersService } from './audit_reminders.service';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';
import { Observable } from 'rxjs';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('audit-reminders')
export class AuditRemindersController {
  constructor(private readonly auditRemindersService: AuditRemindersService) {}

  @Sse('event')
  @IsPublic()
  sendEvent(): Observable<MessageEvent> {
    return this.auditRemindersService.getSseEvents();
  }

  @Post()
  create(@Body() createAuditReminderDto: CreateAuditReminderDto[]) {
    return this.auditRemindersService.create(createAuditReminderDto);
  }

  @Get()
  findAll() {
    return this.auditRemindersService.findAll();
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
