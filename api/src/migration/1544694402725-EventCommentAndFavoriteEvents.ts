import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventCommentAndFavoriteEvents1544694402725 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // tslint:disable-next-line:max-line-length
    await queryRunner.query('CREATE TABLE "comment" ("id" int NOT NULL IDENTITY(1,1), "content" nvarchar(255) NOT NULL, "username" nvarchar(255) NOT NULL, "eventId" uniqueidentifier, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))');
    // tslint:disable-next-line:max-line-length
    await queryRunner.query('CREATE TABLE "user_favorite_events_event" ("userId" uniqueidentifier NOT NULL, "eventId" uniqueidentifier NOT NULL, CONSTRAINT "PK_775adf4e5fdbb6e5ddfdbab5549" PRIMARY KEY ("userId", "eventId"))');
    await queryRunner.query('ALTER TABLE "event" ALTER COLUMN "location" nvarchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE "comment" ADD CONSTRAINT "FK_e4f8f71ea00e6eb8fc2fdd4844f" FOREIGN KEY ("eventId") REFERENCES "event"("id")');
    await queryRunner.query('ALTER TABLE "user_favorite_events_event" ADD CONSTRAINT "FK_13ecfb8c61579bf13cfc48af4bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE');
    await queryRunner.query('ALTER TABLE "user_favorite_events_event" ADD CONSTRAINT "FK_4166f5feba1e5635afa652ada71" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "user_favorite_events_event" DROP CONSTRAINT "FK_4166f5feba1e5635afa652ada71"');
    await queryRunner.query('ALTER TABLE "user_favorite_events_event" DROP CONSTRAINT "FK_13ecfb8c61579bf13cfc48af4bb"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_e4f8f71ea00e6eb8fc2fdd4844f"');
    await queryRunner.query('ALTER TABLE "event" ALTER COLUMN "location" nvarchar(255)');
    await queryRunner.query('DROP TABLE "user_favorite_events_event"');
    await queryRunner.query('DROP TABLE "comment"');
  }

}
