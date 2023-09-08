import styled from "styled-components";

export const TableContainer = styled.section`
  padding: 20px;
`;

export const Table = styled.table`
  background-color: var(--light-background);
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray);
  border-radius: 10px;
  color: var(--white);
`;

export const TableHead = styled.thead`
  display: flex;
  flex-direction: row;
`;

export const TableItem = styled.th`
  border: 1px solid black;
  padding: 5px;
  font-size: 1rem;
  font-weight: 400;
  flex: 1;
`;

export const TableRow = styled.tr`
  display: flex;
  flex-direction: row;
`;
