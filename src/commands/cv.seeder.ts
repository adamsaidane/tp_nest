import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { CvService } from '../cv/cv.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userService = app.get(UserService);
    const skillService = app.get(SkillService);
    const cvService = app.get(CvService);

    console.log('Début du seed');

    console.log('Création des utilisateurs');
    const users = await userService.seedUsers(10);
    console.log(`${users.length} utilisateurs créés`);

    console.log('Création des compétences');
    const skills = await skillService.seedSkills(10);
    console.log(`${skills.length} compétences créées`);

    console.log('Création des CVs');
    const cvs = await cvService.seedCvs(users, skills, 20);
    console.log(`${cvs.length} CVs créés`);

    console.log('Seed terminé avec succès !');

    await app.close();
}

bootstrap().catch((err) => {
    console.error('Erreur lors du seed:', err);
    process.exit(1);
});
