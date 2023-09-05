import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "price_updater",
  synchronize: false,
  logging: true,
  entities: [
    /* Colocar aqui as entidades */
  ],
});
