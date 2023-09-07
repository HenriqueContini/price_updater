import { Pack } from "../entity/Pack";
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

function checkNewPackPrice(productData: ProductType[], rawPacksData: Pack[]) {
  const packsIDs = rawPacksData.map((item) => item.pack.code);
  const productsIDs = productData.map((item) => item.code);

  productData.forEach((product) => {
    // Check if is a pack
    if (packsIDs.includes(product.code)) {
      const problems: string[] = product.problems || [];
      console.log(`O produto: ${product.code} é um pack`);

      // Get products from pack
      const packProducts = rawPacksData.filter(
        (item) => item.pack.code === product.code
      );

      // Get products price and qty
      const productsPrice = packProducts.map((pack) => {
        return {
          qty: pack.qty,
          productID: pack.product.code,
          price: pack.product.sales_price,
        };
      });

      let newPrice = 0;

      // Get new price
      productsPrice.forEach((item) => {
        console.log(item);
        if (productsIDs.includes(item.productID)) {
          const newProduct = productData.find((p) => p.code === item.productID);
          console.log(Number(newProduct?.new_price) * Number(item.qty));
          newPrice += Number(newProduct?.new_price) * Number(item.qty);
        } else {
          console.log(Number(item.qty) * item.price);
          newPrice += Number(item.qty) * item.price;
        }
      });

      if (newPrice !== Number(product.new_price)) {
        problems.push(
          "O novo preço do pack não corresponde ao preço dos componentes"
        );
      }

      console.log(newPrice);

      product.problems = problems;
    }
  });
}

export { checkIfPackIsOnFile, checkNewPackPrice };
