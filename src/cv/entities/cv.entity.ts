import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable,} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('cvs')
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    firstname: string;

    @Column()
    age: number;

    @Column({ length: 20 })
    cin: string;

    @Column({ length: 200 })
    job: string;

    @Column({ length: 255 })
    path: string;

    @ManyToOne(() => User, (user) => user.cvs)
    user: User;

    @ManyToMany(() => Skill, (skill) => skill.cvs)
    @JoinTable({
        name: 'cv_skills',
        joinColumn: { name: 'cv_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
    })
    skills: Skill[];
}