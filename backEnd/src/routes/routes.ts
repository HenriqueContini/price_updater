import { Application, Request, Response } from "express";

const routes = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo");
  });
};

export default routes;
