import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentsController } from './departaments.controller';
import { DepartamentsService } from './departaments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Departament } from './entities/departament.entity';

describe('DepartamentsController', () => {
  let controller: DepartamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentsController],
      providers: [
        DepartamentsService,
        {
          provide: getRepositoryToken(Departament),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DepartamentsController>(DepartamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
