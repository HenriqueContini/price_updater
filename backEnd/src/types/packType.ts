import { ProductType } from "./productType";

export type PackType = {
  id: string;
  pack_id: string;
  products: ProductType[];
  qty: string;
};
