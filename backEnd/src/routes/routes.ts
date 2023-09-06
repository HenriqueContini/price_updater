import { Application, Request, Response } from "express";
import fileRoute from "./fileRoute";

const routes = (app: Application) => {
  app.use(fileRoute);

  app.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo");
  });
};

export default routes;
