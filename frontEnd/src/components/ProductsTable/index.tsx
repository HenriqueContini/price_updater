import { ProductType } from "../../types/productType";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ProductsTableProps {
  products: ProductType[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="Product Table">
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Preço atual</TableCell>
            <TableCell align="right">Preço novo</TableCell>
            <TableCell align="right">Problemas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow
              key={item.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.code}</TableCell>
              <TableCell align="right">{item.sales_price}</TableCell>
              <TableCell align="right">{item.new_price}</TableCell>
              <TableCell align="right">
                {item.problems?.map((problem) => problem)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
