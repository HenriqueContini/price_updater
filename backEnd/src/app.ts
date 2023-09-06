import express, { Application } from "express";
import routes from "./routes/routes";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

/* AppDataSource.initialize()
  .then(() => {
    console.log("Database started without any problems");
  })
  .catch((error) => console.log(error)); */

export default app;
