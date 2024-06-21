import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiblesService } from './responsibles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Responsible } from './entities/responsible.entity';
import { UsersService } from '../users/users.service';
import { MailingService } from '../mailing/mailing.service';
import { User } from '../users/entities/user.entity';
import { CreateHashPassword } from '../utils/createHashPassword';

describe('ResponsiblesService', () => {
  let service: ResponsiblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsiblesService,
        UsersService,
        MailingService,
        CreateHashPassword,
        {
          provide: getRepositoryToken(Responsible),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ResponsiblesService>(ResponsiblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
