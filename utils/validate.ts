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

export type AuthorData = {
  firstName: string;
  lastName: string;
  nationality: string;
};

export const validateAuthor = (author: AuthorData) => {
  const { firstName, lastName, nationality } = author;

  if (!firstName) {
    throw new Error("First name is required");
  } else if (!lastName) {
    throw new Error("Last name is required");
  } else if (!nationality) {
    throw new Error("Nationality is required");
  }

  if (firstName && typeof firstName !== "string") {
    throw new Error("First name should be of type string");
  }

  if (lastName && typeof lastName !== "string") {
    throw new Error("Last name should be of type string");
  }

  if (nationality && typeof nationality !== "string") {
    throw new Error("Nationality should be of type string");
  }
};
