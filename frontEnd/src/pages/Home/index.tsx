import { Container } from "@mui/material";
import FileForm from "../../components/FileForm";
import ProductsTable from "../../components/ProductsTable";
import { checkDataAPI } from "../../services/checkData";
import { ApiResponseType } from "../../types/apiResponse";
import { ProductType } from "../../types/productType";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [products, setProducts] = useState<ProductType[]>([]);
  /*   const [csv, setCSV] = useState<CSVType[]>([]); */

  const checkData = async () => {
    if (file) {
      const data: ApiResponseType = await checkDataAPI(file);

      if (data.products) setProducts(data.products);
      /* if (data.csvProblems) setCSV(data.csvProblems); */
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <FileForm file={file} setFile={setFile} checkData={checkData} />
      <ProductsTable products={products} />
    </Container>
  );
}
