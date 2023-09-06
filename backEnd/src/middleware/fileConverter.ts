import { NextFunction, Request, Response } from "express";
import errorResponse from "../common/errorResponse";
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
    if (!file) return errorResponse(res, 400, "É necessário enviar um arquivo");

    const readable = new Readable();
    readable.push(file.buffer);
    readable.push(null); // Ends push

    const fileReader = readline.createInterface({
      input: readable,
    });

    const csvData: CSVType[] = [];

    let headerLine = true;

    fileReader.on("line", (rawLine: string) => {
      if (headerLine) {
        headerLine = false;
        return;
      }

      const line = rawLine.split(",");

      csvData.push({
        product_code: line[0],
        new_price: Number.parseInt(line[1]),
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
