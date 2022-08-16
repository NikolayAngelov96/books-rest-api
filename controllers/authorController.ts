import express, { Request, Response } from "express";
import { prisma } from "../index";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany({
    orderBy: {
      firstName: "asc",
      lastName: "asc",
    },
  });

  res.status(200).json(authors);
});

export default router;
