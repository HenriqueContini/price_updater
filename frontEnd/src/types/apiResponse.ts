import { CSVType } from "./csvType";
import { ProductType } from "./productType";

export type ApiResponseType = {
  error: boolean;
  errorMessage?: string;
  csvProblems?: CSVType[];
  products?: ProductType[];
};
