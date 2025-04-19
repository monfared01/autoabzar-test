import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1745103912513 implements MigrationInterface {
    name = 'Mig1745103912513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('success', 'failed', 'pending')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "voucherId" character varying NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    }

}
