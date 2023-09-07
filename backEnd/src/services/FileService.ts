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
import { PackType } from "../types/packType";
import {
  checkIfPackIsOnFile,
  checkNewPackPrice,
} from "../utils/validatePacksData";

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

      const rawPacksInProductsData = await packRepository.find({
        where: {
          product: In(rawProductsData.map((item) => item.code)),
        },
        relations: {
          pack: true,
          product: true,
        },
      });

      const productsData: ProductType[] = rawProductsData.map((item) => {
        return {
          ...item,
        };
      });

      productsData.forEach((product) => {
        const packs: string[] = [];
        rawPacksInProductsData.map((pack) => {
          if (product.code === pack.product.code) {
            packs.push(pack.pack.code);
          }
        });

        product.packs = packs;
      });

      checkIfProductExists(csvDataWithoutFieldsProblems, productsData);
      checkIfNewProductPriceIsHigherThanCostPrice(productsData);
      checkNewPricePercentage(productsData);

      checkIfPackIsOnFile(productsData);

      const rawPacksData = await packRepository.find({
        where: {
          pack: In(productsData.map((item) => item.code).flat(Infinity)),
        },
        relations: {
          pack: true,
          product: true,
        },
      });

      checkNewPackPrice(productsData, rawPacksData);

      return productsData;
    } catch (error) {
      console.log(error);
    }
  }
}
