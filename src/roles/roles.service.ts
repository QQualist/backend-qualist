import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const createdRole = this.roleRepo.create(createRoleDto);

    const role = await this.roleRepo.save(createdRole);

    return role;
  }

  async findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(uuid: string, updateRoleDto: UpdateRoleDto) {
    const roleExists = await this.roleRepo.findOneBy({ uuid });

    if (!roleExists) {
      throw new NotFoundException('Role not found');
    }

    const role = this.roleRepo.create(updateRoleDto);

    await this.roleRepo.update(uuid, role);

    return await this.roleRepo.findOneBy({ uuid });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
