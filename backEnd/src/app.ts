import express, { Application } from "express";
import routes from "./routes/routes";

const app: Application = express();

routes(app);

export default app;
