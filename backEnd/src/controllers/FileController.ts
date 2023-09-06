import { Request, Response } from "express";

export class FileController {
  static async checkFile(req: Request, res: Response) {
    try {
      console.log(req.body.csvData);

      res.status(200).send("FOI");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro");
    }
  }
}
