import { ProductType } from "../../types/productType";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandableTableRow from "./ExpandableTableRow";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

interface ProductsTableProps {
  products: ProductType[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="Product Table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Produto</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Preço atual</TableCell>
            <TableCell align="right">Preço novo</TableCell>
            <TableCell align="right">Situação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ExpandableTableRow
              key={product.code}
              expandComponent={
                <TableCell colSpan={5}>
                  <Typography variant="subtitle2" component="p" margin="10px">
                    {product.problems && product.problems.length > 0
                      ? "Problemas:"
                      : "Este produto não possui nenhum problema!"}
                  </Typography>

                  <Stack spacing={1}>
                    {product.problems &&
                      product.problems.map((item, index) => (
                        <Box
                          sx={{ padding: "5px 10px" }}
                          component={Paper}
                          variant="outlined"
                          key={index}
                        >
                          {item}
                        </Box>
                      ))}
                  </Stack>
                </TableCell>
              }
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.code}</TableCell>
              <TableCell align="right">
                {product.sales_price
                  ? "R$ " + Number(product.sales_price).toFixed(2)
                  : ""}
              </TableCell>
              <TableCell align="right">
                {product.new_price
                  ? "R$ " + Number(product.new_price).toFixed(2)
                  : ""}
              </TableCell>
              <TableCell align="right">
                {product.problems && product.problems.length > 0 ? (
                  <WarningIcon sx={{ color: theme.palette.warning.main }} />
                ) : (
                  <CheckCircleIcon sx={{ color: theme.palette.success.dark }} />
                )}
              </TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
