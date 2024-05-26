import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findAll(user_uuid: string): Promise<Checklist[]> {
    const userExists = await this.userService.findOne(user_uuid);

    if (!userExists) {
      throw new NotFoundException("user doesn't exists");
    }

    const type_user = await this.userService.getPermissionUser(user_uuid);

    if (type_user.name === 'RESPONSIBLE') {
      throw new UnauthorizedException(
        'User without permission for this action',
      );
    }

    if (type_user.name === 'ADMINISTRATOR') {
      return await this.checklistRepo.findBy({ user: { uuid: user_uuid } });
    }
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
