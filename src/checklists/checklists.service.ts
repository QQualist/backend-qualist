import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChecklistsService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepo: Repository<Checklist>,
    private readonly userService: UsersService,
  ) {}

  async create(createChecklistDto: CreateChecklistDto) {
    const createdChecklist = this.checklistRepo.create(createChecklistDto);

    return await this.checklistRepo.save(createdChecklist);
  }

  async findAll(): Promise<Checklist[]> {
    return await this.checklistRepo.find();
  }

  async findOne(uuid: string) {
    return await this.checklistRepo.findOneBy({ uuid });
  }

  async update(uuid: string, updateChecklistDto: UpdateChecklistDto) {
    const checklistExists = await this.checklistRepo.findOneBy({ uuid });

    if (!checklistExists) {
      throw new NotFoundException('Checklist not found');
    }

    const checklist = this.checklistRepo.create({
      ...updateChecklistDto,
      version: checklistExists.version + 1,
    });

    await this.checklistRepo.update(uuid, checklist);

    return await this.checklistRepo.findOneBy({ uuid });
  }

  async remove(uuid: string) {
    //The item is only marked as depreciated
    const checklistExists = await this.checklistRepo.findOneBy({ uuid });

    if (!checklistExists) {
      throw new NotFoundException('Checklist not found');
    }

    const checklist = this.checklistRepo.create({
      ...checklistExists,
      active: false,
    });

    await this.checklistRepo.update(uuid, checklist);
  }
}
