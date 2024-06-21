import { Test, TestingModule } from '@nestjs/testing';
import { UserTypesController } from './user_types.controller';
import { UserTypesService } from './user_types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserType } from './entities/user-type.entity';

describe('UserTypesController', () => {
  let controller: UserTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTypesController],
      providers: [
        UserTypesService,
        {
          provide: getRepositoryToken(UserType),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserTypesController>(UserTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
