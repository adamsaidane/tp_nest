import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775062338593 implements MigrationInterface {
    name = 'Init1775062338593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`designation\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cvs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`firstname\` varchar(100) NOT NULL, \`age\` int NOT NULL, \`cin\` varchar(20) NOT NULL, \`job\` varchar(200) NOT NULL, \`path\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_skills\` (\`cv_id\` int NOT NULL, \`skill_id\` int NOT NULL, INDEX \`IDX_c8436ad06c95092d9dd3d63a51\` (\`cv_id\`), INDEX \`IDX_024de0b6195d19e2329be188c5\` (\`skill_id\`), PRIMARY KEY (\`cv_id\`, \`skill_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cvs\` ADD CONSTRAINT \`FK_4fd87fe6ca0c1701dd320bbf643\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_skills\` ADD CONSTRAINT \`FK_c8436ad06c95092d9dd3d63a513\` FOREIGN KEY (\`cv_id\`) REFERENCES \`cvs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cv_skills\` ADD CONSTRAINT \`FK_024de0b6195d19e2329be188c52\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cv_skills\` DROP FOREIGN KEY \`FK_024de0b6195d19e2329be188c52\``);
        await queryRunner.query(`ALTER TABLE \`cv_skills\` DROP FOREIGN KEY \`FK_c8436ad06c95092d9dd3d63a513\``);
        await queryRunner.query(`ALTER TABLE \`cvs\` DROP FOREIGN KEY \`FK_4fd87fe6ca0c1701dd320bbf643\``);
        await queryRunner.query(`DROP INDEX \`IDX_024de0b6195d19e2329be188c5\` ON \`cv_skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_c8436ad06c95092d9dd3d63a51\` ON \`cv_skills\``);
        await queryRunner.query(`DROP TABLE \`cv_skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`cvs\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
    }

}
