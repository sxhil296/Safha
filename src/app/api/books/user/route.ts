import { db } from "@/db";
import { Books } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const books = await db.select().from(Books).where(eq(Books.userId, userId));
  return new Response(JSON.stringify(books));
}
