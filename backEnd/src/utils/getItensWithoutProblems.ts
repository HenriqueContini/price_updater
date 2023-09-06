import { CSVType } from "../types/csvType";

export default function getItensWithoutProblems(csvData: CSVType[]): CSVType[] {
  const newData: CSVType[] = csvData.filter(
    (item) => item.problems?.length === 0
  );

  return newData;
}
