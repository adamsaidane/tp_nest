import { MigrationInterface, QueryRunner } from "typeorm";

export class  Update1775237177754 implements MigrationInterface {
    name = ' Update1775237177754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
