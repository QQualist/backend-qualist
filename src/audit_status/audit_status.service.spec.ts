import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusService } from './audit_status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditStatus } from './entities/audit_status.entity';

describe('AuditStatusService', () => {
  let service: AuditStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditStatusService,
        {
          provide: getRepositoryToken(AuditStatus),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuditStatusService>(AuditStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
