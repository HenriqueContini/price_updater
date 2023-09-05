import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataIntoPacks1693955422100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO packs (pack_id,product_id, qty) VALUES (1000,18,6);"
    );
    await queryRunner.query(
      "INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,24,1);"
    );
    await queryRunner.query(
      "INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,26,1);"
    );
    await queryRunner.query(
      "INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,19,3);"
    );
    await queryRunner.query(
      "INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,21,3);"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM packs");
  }
}
