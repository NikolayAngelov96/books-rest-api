import { Book } from "@prisma/client";

export type BookData = {
  title: string;
  year: number;
  description?: string;
  authorId: string;
};

export const validateBook = (book: BookData) => {
  const { title, year, description, authorId } = book;

  if (!title) {
    throw new Error("Title is required");
  } else if (!year) {
    throw new Error("Year is required");
  } else if (!authorId) {
    throw new Error("Please provide authorId");
  }
};
