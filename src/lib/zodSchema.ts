import { z } from "zod";

const categories = [
    "Religion",
    "Tech",
    "History",
    "Self Help",
    "Fiction",
] as const;

export const addBookFormSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Book title must be at least 3 characters long." })
        .nonempty({ message: "Book title is required." }),
    author: z
        .string()
        .min(3, { message: "Author name must be at least 3 characters long." })
        .nonempty({ message: "Author name is required." }),
    category: z.enum(categories, {
        errorMap: () => ({ message: "No category selected." }),
    }),
    description: z
        .string()
        .min(10, {
            message: "Book Description must be at least 10 characters long.",
        })
        .nonempty({ message: "Book description is required." }),
    bookPdf: z.instanceof(File, { message: "A valid PDF file is required." }),
});

export const addBookFormInitialState = {
    title: "",
    author: "",
    category: categories[0],
    description: "",
    bookPdf: null as File | null,
};
