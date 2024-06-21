import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user-type.entity';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,
  ) {}

  async seed() {
    const count = await this.userTypeRepo.count();
    if (count === 0) {
      await this.userTypeRepo.save([
        { name: 'ADMINISTRATOR' },
        { name: 'QUALITY ASSURANCE' },
        { name: 'RESPONSIBLE' },
      ]);
    }
  }

  async findAll() {
    return await this.userTypeRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userType`;
  }
}
