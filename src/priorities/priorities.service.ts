import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Item } from '../items/entities/item.entity';

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepo: Repository<Priority>,
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    private readonly userService: UsersService,
  ) {}

  async create(createPriorityDto: CreatePriorityDto) {
    const createdPriority = this.priorityRepo.create(createPriorityDto);

    const priority = await this.priorityRepo.save(createdPriority);

    return priority;
  }

  async findAll(user_uuid: string) {
    const type_user = await this.userService.getPermissionUser(user_uuid);

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission for this action',
      );
    }

    return await this.priorityRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(uuid: string) {
    return await this.priorityRepo.findOneBy({ uuid });
  }

  async update(uuid: string, updatePriorityDto: UpdatePriorityDto) {
    const priorityInUse = await this.isPriorityInUse(uuid);

    if (priorityInUse) {
      throw new ConflictException(
        'The priority cannot be updated because it is currently in use by one or more items.',
      );
    }

    const priorityExists = await this.priorityRepo.findOneBy({ uuid });

    if (!priorityExists) {
      throw new NotFoundException('Priority not found');
    }

    const createdPriority = this.priorityRepo.create(updatePriorityDto);

    await this.priorityRepo.update(uuid, createdPriority);

    return await this.priorityRepo.findOneBy({ uuid });
  }

  remove(id: number) {
    return `This action removes a #${id} priority`;
  }

  async isPriorityInUse(priority_uuid: string): Promise<boolean> {
    const countPriorities = await this.itemRepo.count({
      where: { priority: { uuid: priority_uuid } },
    });

    return countPriorities > 0;
  }
}
