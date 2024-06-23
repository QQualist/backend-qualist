import { Test, TestingModule } from '@nestjs/testing';
import { AuditsService } from './audits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';

describe('AuditsService', () => {
  let service: AuditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditsService,
        {
          provide: getRepositoryToken(Audit),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuditsService>(AuditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
