import { DataSource } from 'typeorm';
import { Cv } from './src/cv/entities/cv.entity';
import { Skill } from './src/skill/entities/skill.entity';
import { User } from './src/user/entities/user.entity';
import { CvLog } from './src/cv-log/entities/cv-log.entity';
import { Message } from './src/chat/entities/message.entity';
import { WebhookSubscription } from './src/webhook/entities/webhook-subscription.entity';
import * as dotenv from 'dotenv';
dotenv.config();
export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'cv_db',

  entities: [Cv, Skill, User, CvLog, Message, WebhookSubscription],
  migrations: ['migrations/*.ts'],

  synchronize: true,
});
