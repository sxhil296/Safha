import { db } from "@/db";
import { Books } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return notFound();

  const books = await db.select().from(Books).where(eq(Books.userId, userId));
  return new Response(JSON.stringify(books));
}
