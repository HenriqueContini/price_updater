import { Container } from "@mui/material";
import FileForm from "../../components/FileForm";
import ProductsTable from "../../components/ProductsTable";
import { checkDataAPI } from "../../services/checkData";
import { ApiResponseType } from "../../types/apiResponse";
import { ProductType } from "../../types/productType";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [products, setProducts] = useState<ProductType[]>([]);
  /*   const [csv, setCSV] = useState<CSVType[]>([]); */

  const checkData = async () => {
    if (file) {
      const data: ApiResponseType = await checkDataAPI(file);

      if (data.products) setProducts(data.products);

      if (data.csvProblems) {
        const newArr: ProductType[] = data.csvProblems.map((item) => {
          return {
            code: item.product_code,
            new_price: item.new_price,
            problems: item.problems,
          };
        });

        setProducts((prev) => [...prev, ...newArr]);
      }
    }
  };

  useEffect(() => {
    setProducts([]);
  }, [file]);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <FileForm file={file} setFile={setFile} checkData={checkData} />
      {products && products.length > 0 ? (
        <ProductsTable products={products} />
      ) : null}
    </Container>
  );
}
