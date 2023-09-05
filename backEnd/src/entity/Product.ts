import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryColumn({ type: "bigint" })
  code: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  cost_price: number;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  sales_price: number;
}
