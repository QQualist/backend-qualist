import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const type_user = await this.userService.getPermissionUser(
      createChecklistDto.user_uuid,
    );

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission to perform this action',
      );
    }

    const createdChecklist = this.checklistRepo.create({
      ...createChecklistDto,
      user: { uuid: createChecklistDto.user_uuid },
    });

    return await this.checklistRepo.save(createdChecklist);
  }

  findAll() {
    return `This action returns all checklists`;
  }

  findOne(id: string) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
