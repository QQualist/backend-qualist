import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { In, Repository } from 'typeorm';
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

  async findAll(user_uuid: string) {
    const type_user = await this.userService.getPermissionUser(user_uuid);

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission for this action',
      );
    }

    if (type_user.name === 'ADMINISTRATOR') {
      const allUserUuids =
        await this.userService.findAllUsersCreatedBy(user_uuid);
      allUserUuids.push(user_uuid); // Include the administrator's own UUID

      return await this.priorityRepo.find({
        where: { user: { uuid: In(allUserUuids) } },
      });
    }

    if (type_user.name === 'QUALITY ASSURANCE') {
      const allUserUuids =
        await this.userService.findCreatorAndAllCreatedUsers(user_uuid);

      return await this.priorityRepo.find({
        where: { user: { uuid: In(allUserUuids) } },
      });
    }
  }

  async findOne(uuid: string) {
    return await this.priorityRepo.findOneBy({ uuid });
  }

  async update(uuid: string, updatePriorityDto: UpdatePriorityDto) {
    const [priorityExists, type_user] = await Promise.all([
      this.priorityRepo.findOneBy({ uuid }),
      this.userService.getPermissionUser(updatePriorityDto.user_uuid),
    ]);

    if (!priorityExists) {
      throw new NotFoundException('Priority not found');
    }

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission for this action',
      );
    }

    const createdPriority = this.priorityRepo.create(updatePriorityDto);

    await this.priorityRepo.update(uuid, createdPriority);

    return await this.priorityRepo.findOneBy({ uuid });
  }

  remove(id: number) {
    return `This action removes a #${id} priority`;
  }
}
