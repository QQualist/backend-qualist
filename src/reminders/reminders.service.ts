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
        { name: 'NO MOMENTO DA AUDITORIA', time: 1 },
        { name: '5 MINUTOS ANTES', time: 300 },
        { name: '10 MINUTOS ANTES', time: 600 },
        { name: '15 MINUTOS ANTES', time: 900 },
        { name: '30 MINUTOS ANTES', time: 1800 },
        { name: '1 HORA ANTES', time: 3600 },
        { name: '2 HORAS ANTES', time: 7200 },
        { name: '1 DIA ANTES', time: 86400 },
        { name: '2 DIAS ANTES', time: 172800 },
      ]);
    }
  }

  findAll() {
    return `This action returns all reminders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reminder`;
  }
}
