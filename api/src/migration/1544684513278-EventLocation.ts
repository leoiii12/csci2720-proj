import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventLocation1544684513278 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" ADD "location" nvarchar(255)');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "event" DROP COLUMN "location"');
  }

}
