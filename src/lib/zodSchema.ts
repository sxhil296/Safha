import { z } from "zod";

export const addBookFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Book title must be at least 3 characters long." })
    .nonempty({ message: "Book title is required." }),
  author: z
    .string()
    .min(3, { message: "Author name must be at least 3 characters long." })
    .nonempty({ message: "Author name is required." }),
});
