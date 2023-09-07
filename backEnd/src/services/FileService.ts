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
import { Pack } from "../entity/Pack";
import { checkIfPackIsOnFile } from "../utils/validatePacksData";

const productRepository = AppDataSource.getRepository(Product);
const packRepository = AppDataSource.getRepository(Pack);

export class FileService {
  static async checkData(data: CSVType[]) {
    try {
      checkFields(data);

      const csvDataWithoutFieldsProblems = getItensWithoutProblems(data);

      const rawProductsData: ProductType[] = await productRepository.findBy({
        code: In(csvDataWithoutFieldsProblems.map((item) => item.product_code)),
      });

      const rawPacksData = await packRepository.find({
        where: {
          product_id: In(rawProductsData.map((item) => item.code)),
        },
        relations: {
          pack_id: true,
          product_id: true,
        },
      });

      const productsData: ProductType[] = rawProductsData.map((item) => {
        return {
          ...item,
        };
      });

      productsData.forEach((product) => {
        const packs: string[] = [];
        rawPacksData.map((pack) => {
          if (product.code === pack.product_id.code) {
            packs.push(pack.pack_id.code);
          }
        });

        product.packs = packs;
      });

      checkIfProductExists(csvDataWithoutFieldsProblems, productsData);
      checkIfNewProductPriceIsHigherThanCostPrice(productsData);
      checkNewPricePercentage(productsData);

      checkIfPackIsOnFile(productsData);
    } catch (error) {
      console.log(error);
    }
  }
}
