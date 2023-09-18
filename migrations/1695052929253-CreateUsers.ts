import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1695052929253 implements MigrationInterface {
    name = 'CreateUsers1695052929253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(254) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`passwordHash\` varchar(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastLoginAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`failedLoginAttempts\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profliePicture\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`emailVerifiedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` int NOT NULL COMMENT 'アカウントID'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY COMMENT '一意な識別子としてUUIDを使用'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL COMMENT 'アカウント名'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'アカウントID'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'アカウントID'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`emailVerifiedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profliePicture\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`failedLoginAttempts\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastLoginAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`passwordHash\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(60) NOT NULL COMMENT 'ハッシュ化されたパスワード'`);
    }

}
