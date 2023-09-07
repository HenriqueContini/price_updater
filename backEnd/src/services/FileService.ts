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
import {
  checkIfPackIsOnFile,
  checkNewPackPrice,
} from "../utils/validatePacksData";
import { ApiResponseType } from "../types/apiResponse";

const productRepository = AppDataSource.getRepository(Product);
const productManager = AppDataSource.manager;
const packRepository = AppDataSource.getRepository(Pack);

export class FileService {
  static async checkData(data: CSVType[]): Promise<ApiResponseType> {
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

      return {
        error: false,
        csvProblems: data.filter(
          (item) => item.problems && item.problems.length > 0
        ),
        products: productsData,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um problema ao tentar validar os produtos");
    }
  }

  static async updatePrice(productsData: ProductType[]) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.startTransaction();
    let sucess: boolean = false;

    try {
      productsData.map(async (item) => {
        const product = await productManager.findOneBy(Product, {
          code: item.code,
        });

        if (product?.sales_price && item.new_price) {
          product.sales_price = item.new_price;
        }

        await productManager.save(product);
      });

      await queryRunner.commitTransaction();
      sucess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      sucess = false;
      console.log(error);
    } finally {
      await queryRunner.release();
      return sucess;
    }
  }
}
