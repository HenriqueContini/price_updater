import { CSVType } from "../types/csvType";
import { ProductType } from "../types/productType";

function checkFields(csvData: CSVType[]) {
  csvData.forEach((item) => {
    const problems: string[] = [];

    if (!item.product_code) {
      problems.push("Produto não possui código");
    }

    if (isNaN(Number.parseInt(item.product_code))) {
      problems.push("ID do produto precisa ser um número");
    }

    if (!item.new_price) {
      problems.push("Produto não possui novo valor");
    }

    item.problems = problems;
  });
}

function checkIfProductExists(csvData: CSVType[], productsData: ProductType[]) {
  csvData.forEach((item) => {
    if (!productsData.some((i) => i.code === item.product_code)) {
      item.problems = ["O produto não existe"];
    }

    productsData.forEach((p) => {
      if (p.code === item.product_code) {
        p.new_price = item.new_price;
      }
    });
  });
}

function checkIfNewProductPriceIsHigherThanCostPrice(products: ProductType[]) {
  products.forEach((item) => {
    const problems: string[] = item.problems || [];

    const costPrice: number = Number(item.cost_price);
    const newPrice: number = Number(item.new_price);

    if (costPrice > newPrice) {
      problems.push("O novo preço não pode ser menor que o preço de custo");
    }

    item.problems = problems;
  });
}

function checkNewPricePercentage(products: ProductType[]) {
  products.forEach((item) => {
    const problems: string[] = item.problems || [];

    if (item.sales_price && item.new_price) {
      const salesPrice: number = Number(item.sales_price);
      const tenPercent: number = salesPrice * 0.1;

      if (item.new_price > salesPrice + tenPercent) {
        problems.push(
          `O novo valor não pode ser maior que R$ ${(
            salesPrice + tenPercent
          ).toFixed(2)}`
        );
      }

      if (item.new_price < item.sales_price - tenPercent) {
        problems.push(
          `O novo valor não pode ser menor que R$ ${(
            salesPrice - tenPercent
          ).toFixed(2)}`
        );
      }
    }

    item.problems = problems;
  });
}

export {
  checkFields,
  checkIfProductExists,
  checkIfNewProductPriceIsHigherThanCostPrice,
  checkNewPricePercentage,
};
