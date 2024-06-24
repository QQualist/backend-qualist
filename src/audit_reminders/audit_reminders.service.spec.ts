import { Test, TestingModule } from '@nestjs/testing';
import { AuditRemindersService } from './audit_reminders.service';

describe('AuditRemindersService', () => {
  let service: AuditRemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditRemindersService],
    }).compile();

    service = module.get<AuditRemindersService>(AuditRemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
