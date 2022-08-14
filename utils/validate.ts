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

  if (title && typeof title !== "string") {
    throw new Error("Title should be of type string");
  }

  if (!Number.isInteger(year)) {
    throw new Error("Year must be an integer");
  }

  if (description && typeof description !== "string") {
    throw new Error("Description must be a string or null");
  }
};
