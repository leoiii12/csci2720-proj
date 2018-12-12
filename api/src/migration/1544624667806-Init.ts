import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1544624667806 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // tslint:disable-next-line:max-line-length
    await queryRunner.query('CREATE TABLE "event" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_30c2f3bbaf6d34a55f8ae6e4614" DEFAULT NEWSEQUENTIALID(), "title" nvarchar(255) NOT NULL, "time" nvarchar(255) NOT NULL, "organizer" nvarchar(255) NOT NULL, "contact" nvarchar(255) NOT NULL, "createDate" datetime2 NOT NULL CONSTRAINT "DF_8e4e8463fe49acf3c4f9ba467a9" DEFAULT getdate(), "updateDate" datetime2 NOT NULL CONSTRAINT "DF_d08ad6aa73f8163b630a78b7d64" DEFAULT getdate(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))');
    // tslint:disable-next-line:max-line-length
    await queryRunner.query('CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "mobilePhone" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "roles" ntext NOT NULL, "createDate" datetime2 NOT NULL CONSTRAINT "DF_456a6c03f0ac80b3a4ae72ffed8" DEFAULT getdate(), "updateDate" datetime2 NOT NULL CONSTRAINT "DF_b802fcb424617b0cef57d37901f" DEFAULT getdate(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "event"');
  }

}
