import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditStatusService } from './audit_status.service';
import { CreateAuditStatusDto } from './dto/create-audit_status.dto';
import { UpdateAuditStatusDto } from './dto/update-audit_status.dto';

@Controller('audit-status')
export class AuditStatusController {
  constructor(private readonly auditStatusService: AuditStatusService) {}

  @Post()
  create(@Body() createAuditStatusDto: CreateAuditStatusDto) {
    return this.auditStatusService.create(createAuditStatusDto);
  }

  @Get()
  findAll() {
    return this.auditStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditStatusDto: UpdateAuditStatusDto) {
    return this.auditStatusService.update(+id, updateAuditStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditStatusService.remove(+id);
  }
}
