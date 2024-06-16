import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiblesController } from './responsibles.controller';
import { ResponsiblesService } from './responsibles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Responsible } from './entities/responsible.entity';
import { UsersService } from '../users/users.service';
import { MailingService } from '../mailing/mailing.service';
import { User } from '../users/entities/user.entity';
import { CreateHashPassword } from '../utils/createHashPassword';

describe('ResponsiblesController', () => {
  let controller: ResponsiblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsiblesController],
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

    controller = module.get<ResponsiblesController>(ResponsiblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
