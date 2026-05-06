// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import {Cv} from "./cv/entities/cv.entity";
import {Skill} from "./skill/entities/skill.entity";
import {User} from "./user/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { CvLogModule } from './cv-log/cv-log.module';
import { CvLog } from './cv-log/entities/cv-log.entity';
import { SseModule } from './sse/sse.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'cv_db',
      entities: [Cv, Skill, User, CvLog],
      synchronize: true,
    }),
    CvModule,
    UserModule,
    SkillModule,
    AuthModule,
    CvLogModule,
    SseModule,
  ],
})
export class AppModule {}