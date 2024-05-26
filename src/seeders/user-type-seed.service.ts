import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './entities/user-type.entity';

@Injectable()
export class UserTypeSeedService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,
  ) {}

  async seed() {
    const count = await this.userTypeRepo.count();
    if (count === 0) {
      await this.userTypeRepo.save([
        { name: 'ADMINISTRATOR' },
        { name: 'RESPONSIBLE' },
        { name: 'QUALITY ASSURANCE' },
      ]);
    }
  }
}
