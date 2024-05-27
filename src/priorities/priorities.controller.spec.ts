import { Test, TestingModule } from '@nestjs/testing';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { UsersService } from '../users/users.service';

describe('PrioritiesController', () => {
  let controller: PrioritiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrioritiesController],
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

    controller = module.get<PrioritiesController>(PrioritiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
