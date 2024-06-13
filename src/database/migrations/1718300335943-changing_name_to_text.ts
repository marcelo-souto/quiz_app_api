import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingNameToText1718300335943 implements MigrationInterface {
    name = 'ChangingNameToText1718300335943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_489efb720a2e872384f78eef1bd" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_489efb720a2e872384f78eef1bd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_489efb720a2e872384f78eef1bd" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_489efb720a2e872384f78eef1bd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_065d4d8f3b5adb4a08841eae3c8" PRIMARY KEY ("name")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    }

}
