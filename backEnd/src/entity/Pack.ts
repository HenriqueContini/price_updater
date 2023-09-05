import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity("packs")
export class Pack {
  @PrimaryColumn({ type: "bigint" })
  id: string;

  @ManyToOne(() => Product, (product) => product.code)
  pack_id: Product;

  @ManyToOne(() => Product, (product) => product.code)
  product_id: Product;

  @Column({ type: "bigint" })
  qty: string;
}
