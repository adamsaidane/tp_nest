import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {Cv} from "./entities/cv.entity";
import {User} from "../user/entities/user.entity";
import {Skill} from "../skill/entities/skill.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {randFullName, randJobTitle, randNumber} from "@ngneat/falso";

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(Cv)
        private cvRepository: Repository<Cv>,
    ) {}

    create(createCvDto: CreateCvDto) {
        return 'This action adds a new cv';
    }
    
    findAll() {
        return `This action returns all cv`;
    }
    
    findOne(id: number) {
        return `This action returns a #${id} cv`;
    }
    
    update(id: number, updateCvDto: UpdateCvDto) {
        return `This action updates a #${id} cv`;
    }
    
    remove(id: number) {
        return `This action removes a #${id} cv`;
    }

    async seedCvs(users: User[], skills: Skill[], count: number = 20): Promise<Cv[]> {
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
