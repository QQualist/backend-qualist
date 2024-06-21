import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusController } from './audit_status.controller';
import { AuditStatusService } from './audit_status.service';

describe('AuditStatusController', () => {
  let controller: AuditStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditStatusController],
      providers: [AuditStatusService],
    }).compile();

    controller = module.get<AuditStatusController>(AuditStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
