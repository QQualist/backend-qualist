import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusController } from './audit_status.controller';
import { AuditStatusService } from './audit_status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditStatus } from './entities/audit_status.entity';

describe('AuditStatusController', () => {
  let controller: AuditStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditStatusController],
      providers: [
        AuditStatusService,
        {
          provide: getRepositoryToken(AuditStatus),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuditStatusController>(AuditStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
