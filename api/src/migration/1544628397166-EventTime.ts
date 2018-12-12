import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventTime1544628397166 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" DROP COLUMN "time"');
    await queryRunner.query('ALTER TABLE "event" ADD "time" datetime NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" DROP COLUMN "time"');
    await queryRunner.query('ALTER TABLE "event" ADD "time" nvarchar(255) NOT NULL');
  }

}
