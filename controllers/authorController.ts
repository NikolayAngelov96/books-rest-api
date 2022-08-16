import express, { Request, Response } from "express";
import { prisma } from "../index";
import { AuthorData, validateAuthor } from "../utils/validate";
import { getError } from "../utils/getError";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany({
    orderBy: {
      firstName: "asc",
    },
  });

  res.status(200).json(authors);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const authorData: AuthorData = req.body;

    validateAuthor(authorData);

    const author = await prisma.author.create({
      data: {
        firstName: authorData.firstName,
        lastName: authorData.lastName,
        nationality: authorData.nationality,
      },
    });

    res.status(201).json(author);
  } catch (error) {
    const { statusCode, message } = getError(error);

    res.status(statusCode).json({ message });
  }
});

export default router;
