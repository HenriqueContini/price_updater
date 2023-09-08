export type ProductType = {
  code: string;
  name: string;
  cost_price: number;
  sales_price: number;
  packs?: string[];
  new_price?: number;
  problems?: string[];
};
