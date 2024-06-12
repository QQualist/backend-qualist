import { Injectable } from '@nestjs/common';
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

  update(id: number, updateDepartamentDto: UpdateDepartamentDto) {
    return `This action updates a #${id} departament`;
  }

  remove(id: number) {
    return `This action removes a #${id} departament`;
  }
}
