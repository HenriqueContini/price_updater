import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1693951908092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE products ( code bigint PRIMARY KEY, name varchar(100) NOT NULL, cost_price decimal(9,2) NOT NULL, sales_price decimal(9,2) NOT NULL);`
    );

    await queryRunner.query(
      `CREATE TABLE packs ( id bigint AUTO_INCREMENT PRIMARY KEY, pack_id bigint NOT NULL, product_id bigint NOT NULL, qty bigint NOT NULL, CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code), CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE packs;`);
    await queryRunner.query(`DROP TABLE products;`);
  }
}
