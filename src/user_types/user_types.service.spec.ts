import { Test, TestingModule } from '@nestjs/testing';
import { UserTypesService } from './user_types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserType } from './entities/user-type.entity';

describe('UserTypesService', () => {
  let service: UserTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypesService,
        {
          provide: getRepositoryToken(UserType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserTypesService>(UserTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
