import { Request, Response } from "express";
import errorResponse from "../utils/errorResponse";
import { FileService } from "../services/FileService";

export class FileController {
  static async checkFile(req: Request, res: Response) {
    try {
      if (req.body.error) return errorResponse(res, 400, req.body.error);

      const data = await FileService.checkData(req.body.csvData);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      errorResponse(res, 500, "Ocorreu um erro desconhecido");
    }
  }

  static async updatePrice(req: Request, res: Response) {
    try {
      if (req.body.error) return errorResponse(res, 400, req.body.error);

      const data = await FileService.checkData(req.body.csvData);

      if (data.csvProblems && data.csvProblems.length > 0)
        return errorResponse(res, 400, "O arquivo possui algum erro");

      if (
        data.products?.some((item) => item.problems && item.problems.length > 0)
      )
        return errorResponse(
          res,
          400,
          "Algum produto do arquivo possui problema"
        );

      if (!data.products)
        return errorResponse(
          res,
          400,
          "O arquivo não possui produtos à serem atualizados"
        );

      const createdWithSucess = await FileService.updatePrice(data.products);

      if (!createdWithSucess)
        return errorResponse(
          res,
          500,
          "Ocorreu um erro ao tentar salvar os dados"
        );

      res.status(201).send();
    } catch (error) {
      console.log(error);
      errorResponse(res, 500, "Ocorreu um erro desconhecido", error);
    }
  }
}
