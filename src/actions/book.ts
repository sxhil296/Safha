"use server";

import { db } from "@/db";
import { Books } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

type Errors = {
  title?: string;
  author?: string;
  category?: string;
  description?: string;
  bookPdf?: string;
};

export type FormState =
  | {
      errors: Errors;
    }
  | undefined;

export async function addBookAction(prevState: FormState, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  // if (!userId) return redirectToSignIn();
  const id = randomUUID();
  const title = (formData.get("title") as string) || "";
  const author = (formData.get("author") as string) || "";
  const category = (formData.get("category") as string) || "";
  const description = (formData.get("description") as string) || "";
  const bookPdf = (formData.get("book") as File) || new File([], "");

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }
  if (!author) {
    errors.author = "Author name is required";
  }
  if (!category) {
    errors.category = "Book Category is required";
  }
  if (!description) {
    errors.description = "Book Description is required";
  }
  if (!bookPdf) {
    errors.bookPdf = "Book PDF file is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const result = await db.insert(Books).values({
    id: id,
    title,
    author,
    bookCategory: category,
    description,
    bookPDF: bookPdf,
    userId,
  });
  revalidatePath("/dashboard/create", "page");
  return result;
}
