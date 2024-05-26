import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentsService } from './departaments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Departament } from './entities/departament.entity';

describe('DepartamentsService', () => {
  let service: DepartamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartamentsService,
        {
          provide: getRepositoryToken(Departament),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DepartamentsService>(DepartamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
