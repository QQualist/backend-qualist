import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsController } from './checklists.controller';
import { ChecklistsService } from './checklists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';
import { UsersService } from '../users/users.service';

describe('ChecklistsController', () => {
  let controller: ChecklistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistsController],
      providers: [
        ChecklistsService,
        {
          provide: getRepositoryToken(Checklist),
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ChecklistsController>(ChecklistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
