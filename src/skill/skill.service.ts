import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {Skill} from "./entities/skill.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {randSkill} from "@ngneat/falso";

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>,
    ) {}
    create(createSkillDto: CreateSkillDto) {
        return 'This action adds a new skill';
    }
    
    findAll() {
        return `This action returns all skill`;
    }
    
    findOne(id: number) {
        return `This action returns a #${id} skill`;
    }
    
    update(id: number, updateSkillDto: UpdateSkillDto) {
        return `This action updates a #${id} skill`;
    }
    
    remove(id: number) {
        return `This action removes a #${id} skill`;
    }

    async seedSkills(count: number = 10): Promise<Skill[]> {
        const skills: Skill[] = [];

        for (let i = 0; i < count; i++) {
            const skill = this.skillRepository.create({
                designation: randSkill(),
            });

            skills.push(skill);
        }

        return this.skillRepository.save(skills);
    }
}
