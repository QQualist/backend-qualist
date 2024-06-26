import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateHashPassword } from '../utils/createHashPassword';
import { UserType } from '../user_types/entities/user-type.entity';

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

  async findAll() {
    const users = await this.userRepo.find({
      order: {
        name: 'ASC',
      },
    });

    for (const user of users) {
      //Remove password attribute
      delete user.password;
    }

    return users;
  }

  async findOne(uuid: string) {
    const user = await this.userRepo.findOne({
      where: { uuid },
      relations: {
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
        departament: true,
        role: true,
        superior: true,
        type: true,
      },
    });

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepo.findOneBy({ uuid });

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const createdUser = this.userRepo.create({
      ...updateUserDto,
      role: { uuid: updateUserDto.role_uuid },
      departament: { uuid: updateUserDto.departament_uuid },
      superior: { uuid: updateUserDto.superior_uuid },
      type: { id: updateUserDto.type_id },
    });

    await this.userRepo.update(uuid, createdUser);

    const user = await this.findOne(uuid);

    if (user.superior) {
      delete user.superior.password;
    }

    return {
      ...user,
      password: undefined,
    };
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
}
