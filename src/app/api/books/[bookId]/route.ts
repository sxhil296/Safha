import { db } from "@/db";
import { Books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const bookId = (await params).bookId;
  if (!bookId) return notFound();

  const book = await db.select().from(Books).where(eq(Books.id, bookId));
  if (!book) return notFound();
  return new Response(JSON.stringify(book[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
