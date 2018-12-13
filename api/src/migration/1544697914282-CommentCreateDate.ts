import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentCreateDate1544697914282 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "comment" ADD "createDate" datetime2 NOT NULL');
    await queryRunner.query('ALTER TABLE "comment" ADD CONSTRAINT "DF_9033a2cea1962a9d5d395ef1a03" DEFAULT getdate() FOR "createDate"');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "DF_9033a2cea1962a9d5d395ef1a03"');
    await queryRunner.query('ALTER TABLE "comment" DROP COLUMN "createDate"');
  }

}
