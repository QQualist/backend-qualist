import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepo: Repository<Reminder>,
  ) {}

  async seed() {
    const count = await this.reminderRepo.count();
    if (count === 0) {
      await this.reminderRepo.save([
        { name: 'AT THE TIME OF THE AUDIT', time: 1 },
        { name: '5 MINUTES BEFORE', time: 300 },
        { name: '10 MINUTES BEFORE', time: 600 },
        { name: '15 MINUTES BEFORE', time: 900 },
        { name: '30 MINUTES BEFORE', time: 1800 },
        { name: '1 HOUR BEFORE', time: 3600 },
        { name: '2 HOURS BEFORE', time: 7200 },
        { name: '1 DAY BEFORE', time: 86400 },
        { name: '2 DAYS BEFORE', time: 172800 },
      ]);
    }
  }

  async findAll() {
    return await this.reminderRepo.find({
      order: {
        time: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reminder`;
  }
}
