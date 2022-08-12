import { Book } from "@prisma/client";

export const validateBook = (book: Book) => {
  const { title, year, description, authorId } = book;

  if (!title) {
    throw new Error("Title is required");
  } else if (!year) {
    throw new Error("Year is required");
  }
};
