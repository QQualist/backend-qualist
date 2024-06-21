import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departament } from './entities/departament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentsService {
  constructor(
    @InjectRepository(Departament)
    private readonly departamentRepo: Repository<Departament>,
  ) {}

  async create(createDepartamentDto: CreateDepartamentDto) {
    const createDepartament = this.departamentRepo.create(createDepartamentDto);

    const departament = await this.departamentRepo.save(createDepartament);

    return departament;
  }

  async findAll() {
    return await this.departamentRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(uuid: string) {
    return await this.departamentRepo.findOneBy({ uuid });
  }

  async update(uuid: string, updateDepartamentDto: UpdateDepartamentDto) {
    const departamentExists = await this.departamentRepo.findOneBy({ uuid });

    if (!departamentExists) {
      throw new NotFoundException('Departament not found');
    }

    const departament = this.departamentRepo.create(updateDepartamentDto);

    await this.departamentRepo.update(uuid, departament);

    return await this.departamentRepo.findOneBy({ uuid });
  }

  remove(id: number) {
    return `This action removes a #${id} departament`;
  }
}
