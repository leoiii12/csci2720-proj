import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventIsDeleted1544724276054 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" ADD "isDeleted" bit NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" DROP COLUMN "isDeleted"');
  }

}
