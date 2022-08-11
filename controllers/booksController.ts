import express, { Request, Response } from "express";
import { prisma } from "../index";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();

  res.json(books);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);

  res.send("ok");
});

export default router;
