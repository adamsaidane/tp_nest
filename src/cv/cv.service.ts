import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randFullName, randJobTitle, randNumber } from '@ngneat/falso';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async create(createCvDto: CreateCvDto, user: User): Promise<Cv> {
    const skills = await this.skillRepository.find({
      where: { id: In(createCvDto.skillIds) },
    });

    const cv = this.cvRepository.create({
      name: createCvDto.name,
      firstname: createCvDto.firstname,
      age: createCvDto.age,
      cin: createCvDto.cin,
      job: createCvDto.job,
      path: createCvDto.path,
      user,
      skills,
    });

    return this.cvRepository.save(cv);
  }

  async findAll(user?: User): Promise<Cv[]> {
    if (!user || user.role === 'admin') {
      return this.cvRepository.find({ relations: ['user', 'skills'] });
    }

    return this.cvRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'skills'],
    });
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({
      where: { id },
      relations: ['user', 'skills'],
    });

    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }

    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const cv = await this.findOne(id);

    if (updateCvDto.skillIds) {
      const skills = await this.skillRepository.find({
        where: { id: In(updateCvDto.skillIds) },
      });
      cv.skills = skills;
    }

    Object.assign(cv, updateCvDto);
    return this.cvRepository.save(cv);
  }

  async remove(id: number): Promise<void> {
    const cv = await this.findOne(id);
    await this.cvRepository.remove(cv);
  }

  async seedCvs(
    users: User[],
    skills: Skill[],
    count: number = 20,
  ): Promise<Cv[]> {
    const cvs: Cv[] = [];

    for (let i = 0; i < count; i++) {
      const fullName = randFullName().split(' ');
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomSkillCount = randNumber({ min: 2, max: 5 });
      const randomSkills = skills
        .sort(() => 0.5 - Math.random())
        .slice(0, randomSkillCount);

      const cv = this.cvRepository.create({
        name: fullName[1],
        firstname: fullName[0],
        age: randNumber({ min: 22, max: 65 }),
        cin: `${randNumber({ min: 10000000, max: 99999999 })}`,
        job: randJobTitle(),
        path: `/uploads/cv${i + 1}.pdf`,
        user: randomUser,
        skills: randomSkills,
      });

      cvs.push(await this.cvRepository.save(cv));
    }

    return cvs;
  }
}
