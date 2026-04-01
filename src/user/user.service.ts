import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {randEmail, randUser} from "@ngneat/falso";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }
    
    findAll() {
        return `This action returns all user`;
    }
    
    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
    
    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }
    
    remove(id: number) {
        return `This action removes a #${id} user`;
    }
    async seedUsers(count: number = 10): Promise<User[]> {
        const users: User[] = [];
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        for (let i = 0; i < count; i++) {
            const fakeUser = randUser();
            const user = this.userRepository.create({
                username: fakeUser.username, 
                email: randEmail(), 
                password: hashedPassword,
            });
            users.push(await this.userRepository.save(user));
        }
        return users;
    }
}
