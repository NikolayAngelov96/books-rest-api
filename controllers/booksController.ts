import express, { Request, Response } from "express";
import { prisma } from "../index";
import { validateBook, BookData } from "../utils/validate";
import { getError } from "../utils/getError";

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
  try {
    const bookData: BookData = req.body;

    validateBook(bookData);

    const book = await prisma.book.create({
      data: {
        title: bookData.title,
        year: bookData.year,
        authorId: bookData.authorId,
        description: bookData.description || null,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    const { statusCode, message } = getError(error);

    res.status(statusCode).json({ message });
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
  try {
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
  } catch (error) {
    const { statusCode, message } = getError(error);

    res.status(statusCode).json({ message });
  }
});

router.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    res.status(200).json({ message: "Successfully deleted a book" });
  } catch (error) {
    const { statusCode, message } = getError(error);

    res.status(statusCode).json({ message });
  }
});

export default router;
