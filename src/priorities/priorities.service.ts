import {
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

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepo: Repository<Priority>,
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
}
