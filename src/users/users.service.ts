import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateHashPassword } from '../utils/createHashPassword';
import { UserType } from '../seeders/entities/user-type.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly createHashPassword: CreateHashPassword,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepo.existsBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = await this.createHashPassword.hashPassword(
      createUserDto.password,
    );

    createUserDto.password = hashPassword;

    const user = this.userRepo.create({
      ...createUserDto,
      departament: { uuid: createUserDto.departament_uuid },
      creator: { uuid: createUserDto.creator_uuid },
      role: { uuid: createUserDto.role_uuid },
      superior: { uuid: createUserDto.superior_uuid },
      type: { id: createUserDto.type_id },
    });

    const userCreated = await this.userRepo.save(user);

    return {
      ...userCreated,
      password: undefined,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(uuid: string) {
    const user = await this.userRepo.findOne({
      where: { uuid },
      relations: {
        creator: true,
        departament: true,
        role: true,
        superior: true,
        type: true,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: {
        creator: true,
        departament: true,
        role: true,
        superior: true,
        type: true,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getPermissionUser(uuid: string): Promise<UserType> {
    const user = await this.userRepo.findOne({
      where: { uuid },
      relations: {
        type: true,
      },
    });

    return user.type;
  }

  async findAllUsersCreatedBy(user_uuid: string): Promise<string[]> {
    const users = await this.userRepo.find({
      where: { creator: { uuid: user_uuid } },
    });
    let allUserUuids = users.map((user) => user.uuid);

    for (const user of users) {
      const subUsers = await this.findAllUsersCreatedBy(user.uuid);
      allUserUuids = allUserUuids.concat(subUsers);
    }

    return allUserUuids;
  }

  async findCreatorAndAllCreatedUsers(user_uuid: string): Promise<string[]> {
    const user = await this.userRepo.findOne({
      where: { uuid: user_uuid },
      relations: ['creator'],
    });
    if (!user || !user.creator) {
      return [];
    }
    const creatorUuid = user.creator.uuid;
    const allUserUuids = await this.findAllUsersCreatedBy(creatorUuid);
    allUserUuids.push(creatorUuid); // Include the creator's own UUID
    return allUserUuids;
  }
}
