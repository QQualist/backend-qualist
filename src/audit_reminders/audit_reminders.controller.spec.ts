import { Test, TestingModule } from '@nestjs/testing';
import { AuditRemindersController } from './audit_reminders.controller';
import { AuditRemindersService } from './audit_reminders.service';

describe('AuditRemindersController', () => {
  let controller: AuditRemindersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditRemindersController],
      providers: [AuditRemindersService],
    }).compile();

    controller = module.get<AuditRemindersController>(AuditRemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
