import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepo: Repository<Priority>,
    private readonly userService: UsersService,
  ) {}

  async create(createPriorityDto: CreatePriorityDto) {
    const type_user = await this.userService.getPermissionUser(
      createPriorityDto.user_uuid,
    );

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission for this action',
      );
    }

    const createdPriority = this.priorityRepo.create({
      ...createPriorityDto,
      user: { uuid: createPriorityDto.user_uuid },
    });

    const priority = await this.priorityRepo.save(createdPriority);

    return priority;
  }

  findAll() {
    return `This action returns all priorities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} priority`;
  }

  update(id: number, updatePriorityDto: UpdatePriorityDto) {
    return `This action updates a #${id} priority`;
  }

  remove(id: number) {
    return `This action removes a #${id} priority`;
  }
}
