import { Test, TestingModule } from '@nestjs/testing';
import { AuditRemindersController } from './audit_reminders.controller';
import { AuditRemindersService } from './audit_reminders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditReminder } from './entities/audit_reminder.entity';

describe('AuditRemindersController', () => {
  let controller: AuditRemindersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditRemindersController],
      providers: [
        AuditRemindersService,
        {
          provide: getRepositoryToken(AuditReminder),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuditRemindersController>(AuditRemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
