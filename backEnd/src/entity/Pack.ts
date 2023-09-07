import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("packs")
export class Pack {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  @ManyToOne(() => Product, (product) => product.code, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "pack_id" })
  pack_id: Product;

  @ManyToOne(() => Product, (product) => product.code, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "bigint" })
  qty: string;
}
