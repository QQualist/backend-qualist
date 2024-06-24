import { Test, TestingModule } from '@nestjs/testing';
import { AuditRemindersService } from './audit_reminders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditReminder } from './entities/audit_reminder.entity';

describe('AuditRemindersService', () => {
  let service: AuditRemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditRemindersService,
        {
          provide: getRepositoryToken(AuditReminder),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuditRemindersService>(AuditRemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
