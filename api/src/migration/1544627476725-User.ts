import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1544627476725 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('EXEC sp_rename "user.mobilePhone", "username"');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('EXEC sp_rename "user.username", "mobilePhone"');
  }

}
