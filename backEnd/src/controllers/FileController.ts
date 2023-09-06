import { Request, Response } from "express";
import errorResponse from "../utils/errorResponse";
import { FileService } from "../services/FileService";

export class FileController {
  static async checkFile(req: Request, res: Response) {
    try {
      if (req.body.error) return errorResponse(res, 400, req.body.error);

      await FileService.checkData(req.body.csvData);

      res.status(200).send("FOI");
    } catch (error) {
      console.log(error);
      errorResponse(res, 500, "Ocorreu um erro desconhecido");
    }
  }
}
