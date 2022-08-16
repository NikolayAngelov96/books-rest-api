import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import booksController from "./controllers/booksController";
import authorsController from "./controllers/authorController";

const app: Express = express();

export const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/books", booksController);
app.use("/authors", authorsController);

app.listen(3030, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3030`)
);
