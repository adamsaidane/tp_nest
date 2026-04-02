import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Cv]), UserModule, SkillModule],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'cvs', method: RequestMethod.POST },
        { path: 'cvs/:id', method: RequestMethod.PATCH },
        { path: 'cvs/:id', method: RequestMethod.DELETE },
      );
  }
}
