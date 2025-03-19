"use server";

 type Errors = {
  title?: string;
  author?: string;
  bookCategory?: string;
  description?: string;
  bookPDF?: string;
};
export type FormState = {
    errors: Errors;
  } | undefined;

export async function addBookAction(prevState:FormState, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const bookCategory = formData.get("bookCategory") as string;
  const description = formData.get("description") as string;
  const bookPDF = formData.get("book") as File;

  const errors: Errors = {};

  if (!title || title.trim().length < 3) {
    errors.title =
      "Title is reqiured and must be at least three characters long.";
  }

  if (!author || author.trim().length < 3) {
    errors.author =
      "Author name is reqiured and must be at least three characters long.";
  }
  if (!bookCategory) {
    errors.bookCategory = "Book Category name is reqiured.";
  }
  if (!bookPDF) {
    errors.bookPDF = "Book PDF File is reqiured.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
}
