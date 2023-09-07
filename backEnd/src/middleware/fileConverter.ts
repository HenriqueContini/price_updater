import { NextFunction, Request, Response } from "express";
import errorResponse from "../utils/errorResponse";
import { Readable } from "stream";
import readline from "readline";
import { CSVType } from "../types/csvType";

export default async function fileConverter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    if (!file) {
      req.body.error = "É necessário enviar um arquivo.";
      return next();
    }

    const fileTypes = ["text/csv", "application/vnd.ms-excel"];

    if (!fileTypes.includes(file.mimetype)) {
      console.log(file.mimetype);
      req.body.error = "O arquivo precisa ser do tipo CSV.";
      return next();
    }

    const readable = new Readable();
    readable.push(file.buffer);
    readable.push(null); // Ends push

    const fileReader = readline.createInterface({
      input: readable,
    });

    const csvData: CSVType[] = [];

    let headerLine = true;
    const header = "product_code,new_price";

    fileReader.on("line", (rawLine: string) => {
      if (headerLine) {
        if (rawLine === header) {
          headerLine = false;
          return;
        }

        return (req.body.error =
          "O cabeçalho do arquivo deve seguir o padrão: product_code,new_price");
      }

      const line = rawLine.split(",");

      csvData.push({
        product_code: line[0],
        new_price: Number.parseFloat(line[1]),
      });
    });

    fileReader.on("close", () => {
      req.body.csvData = csvData;
      next();
    });
  } catch (error) {
    console.log(error);
    errorResponse(
      res,
      500,
      "Ocorreu um erro desconhecido ao tentar ler o arquivo",
      error
    );
  }
}
