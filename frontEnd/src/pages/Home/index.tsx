import { Alert, Box, Button, Container, Typography } from "@mui/material";
import FileForm from "../../components/FileForm";
import ProductsTable from "../../components/ProductsTable";
import { checkDataAPI } from "../../services/checkData";
import { ApiResponseType } from "../../types/apiResponse";
import { ProductType } from "../../types/productType";
import { useEffect, useState } from "react";
import { updatePriceAPI } from "../../services/updatePrice";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasError, setHasError] = useState<{ error: boolean; msg: string }>({
    error: false,
    msg: "",
  });
  const [created, setCreated] = useState<boolean>(false);

  const checkData = async () => {
    if (file) {
      const data: ApiResponseType = await checkDataAPI(file);

      setCreated(false);

      if (data.error)
        setHasError({ error: true, msg: data.errorMessage || "" });

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

  const updatePrice = async () => {
    if (file) {
      const data: ApiResponseType = await updatePriceAPI(file);

      if (data.error)
        setHasError({ error: true, msg: data.errorMessage || "" });

      setCreated(true);
      setProducts([]);
      setFile(undefined);
    }
  };

  useEffect(() => {
    setProducts([]);
    setHasError({ error: false, msg: "" });
    if (file) setCreated(false);
  }, [file]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      <FileForm file={file} setFile={setFile} checkData={checkData} />
      {hasError.error && (
        <Alert severity="error">
          {hasError.msg || "Ocorreu um problema desconhecido"}
        </Alert>
      )}
      {created && (
        <Alert severity="success">Valores atualizados com sucesso</Alert>
      )}
      {!hasError.error && products && products.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            <Typography component="h3" variant="h6">
              Lista de produtos
            </Typography>
            <Button
              variant="contained"
              disabled={products.some(
                (item) => item.problems && item.problems.length > 0
              )}
              onClick={updatePrice}
            >
              Atualizar
            </Button>
          </Box>
          <ProductsTable products={products} />
        </>
      ) : null}
    </Container>
  );
}
