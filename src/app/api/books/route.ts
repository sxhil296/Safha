import { db } from "@/db";
import { Books } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  const id = randomUUID();
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const { title, author, category, description, book } = body;
  console.log(">>>>", id, title, author, category, description, userId)
  const newBook = await db.insert(Books).values({
    id,
    title,
    author,
    category,
    description,
    book,
    userId,
  });

  return new Response(JSON.stringify(newBook), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
