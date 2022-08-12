import { Book } from "@prisma/client";
import express, { Request, Response } from "express";
import { prisma } from "../index";
import { validateBook } from "../utils/validate";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      year: true,
      author: true,
    },
  });

  res.json(books);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const bookData: Book = req.body;

    validateBook(bookData);

    const book = await prisma.book.create({
      data: {
        ...bookData,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    let message = "Something Went Wrong";
    if (error instanceof Error) {
      console.error(error);
      message = error.message;
      return res.status(400).json({ message });
    } else {
      return res.status(500).json({ message });
    }
  }
});

export default router;
