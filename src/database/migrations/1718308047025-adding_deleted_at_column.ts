import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDeletedAtColumn1718308047025 implements MigrationInterface {
    name = 'AddingDeletedAtColumn1718308047025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "DeletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "DeletedAt"`);
    }

}
