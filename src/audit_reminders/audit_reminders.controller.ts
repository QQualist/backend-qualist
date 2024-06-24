import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditRemindersService } from './audit_reminders.service';
import { CreateAuditReminderDto } from './dto/create-audit_reminder.dto';
import { UpdateAuditReminderDto } from './dto/update-audit_reminder.dto';

@Controller('audit-reminders')
export class AuditRemindersController {
  constructor(private readonly auditRemindersService: AuditRemindersService) {}

  @Post()
  create(@Body() createAuditReminderDto: CreateAuditReminderDto) {
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
  update(@Param('id') id: string, @Body() updateAuditReminderDto: UpdateAuditReminderDto) {
    return this.auditRemindersService.update(+id, updateAuditReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditRemindersService.remove(+id);
  }
}
