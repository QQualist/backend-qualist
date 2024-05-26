import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepo.existsBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ email });

    return {
      ...user,
      password: undefined,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
