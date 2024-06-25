import { Test, TestingModule } from '@nestjs/testing';
import { AuditsController } from './audits.controller';
import { AuditsService } from './audits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { AuditRemindersService } from '../audit_reminders/audit_reminders.service';
import { AuditReminder } from '../audit_reminders/entities/audit_reminder.entity';

describe('AuditsController', () => {
  let controller: AuditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditsController],
      providers: [
        AuditsService,
        {
          provide: getRepositoryToken(Audit),
          useValue: {},
        },
        {
          provide: getRepositoryToken(AuditReminder),
          useValue: {},
        },
        {
          provide: AuditRemindersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuditsController>(AuditsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
