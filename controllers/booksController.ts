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

router.get("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      author: true,
    },
  });

  if (!book) {
    return res.status(404).json({
      message: "Book with the provided id does not exist in database",
    });
  }

  res.status(200).json(book);
});

router.put("/:bookId", async (req: Request, res: Response) => {
  const bookData = req.body;
  const { bookId } = req.params;

  const updatedBook = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      ...bookData,
    },
  });

  res.status(200).json(updatedBook);
});

export default router;
