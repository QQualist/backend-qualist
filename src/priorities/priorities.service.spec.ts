import { Test, TestingModule } from '@nestjs/testing';
import { PrioritiesService } from './priorities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { UsersService } from '../users/users.service';

describe('PrioritiesService', () => {
  let service: PrioritiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrioritiesService,
        {
          provide: getRepositoryToken(Priority),
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PrioritiesService>(PrioritiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
