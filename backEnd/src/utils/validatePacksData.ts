import { ProductType } from "../types/productType";

function checkIfPackIsOnFile(productData: ProductType[]) {
  const productsIds = productData.map((i) => i.code);

  productData.forEach((product) => {
    const problems: string[] = product.problems || [];

    // Check if is part of a pack
    if (product.packs && product.packs.length > 0) {
      // Check if pack is on file
      product.packs.map((pack) => {
        if (!productsIds.includes(pack)) {
          problems.push(
            `Este produto faz parte do pack: ${pack}, que é necessário no arquivo`
          );

          product.problems = problems;
        }
      });
    }
  });
}

export { checkIfPackIsOnFile };
