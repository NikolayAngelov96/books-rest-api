import express, { Express } from "express";
import booksController from "./controllers/booksController";

const app: Express = express();

app.use("/books", booksController);

app.listen(3030, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3030`)
);
