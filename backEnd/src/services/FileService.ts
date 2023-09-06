import { In } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Product } from "../entity/Product";
import { CSVType } from "../types/csvType";
import {
  checkFields,
  checkIfNewProductPriceIsHigherThanCostPrice,
  checkIfProductExists,
  checkNewPricePercentage,
} from "../utils/validateProductsData";
import { ProductType } from "../types/productType";
import getItensWithoutProblems from "../utils/getItensWithoutProblems";

const productRepository = AppDataSource.getRepository(Product);

export class FileService {
  static async checkData(data: CSVType[]) {
    try {
      checkFields(data);

      const csvDataWithoutFieldsProblems = getItensWithoutProblems(data);

      const rawProductsData: ProductType[] = await productRepository.findBy({
        code: In(csvDataWithoutFieldsProblems.map((item) => item.product_code)),
      });

      const productsData: ProductType[] = rawProductsData.map((item) => {
        return {
          ...item,
        };
      });

      checkIfProductExists(csvDataWithoutFieldsProblems, productsData);
      checkIfNewProductPriceIsHigherThanCostPrice(productsData);
      checkNewPricePercentage(productsData);
    } catch (error) {
      console.log(error);
    }
  }
}
