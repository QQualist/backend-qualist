import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusService } from './audit_status.service';

describe('AuditStatusService', () => {
  let service: AuditStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditStatusService],
    }).compile();

    service = module.get<AuditStatusService>(AuditStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
