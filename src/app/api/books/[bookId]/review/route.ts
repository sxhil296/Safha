import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { notFound } from "next/navigation";

export async function POST(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  const body = await request.json();
  const reviewId = randomUUID();
  const { userId } = await auth();
  if (!userId) return notFound();
  const bookId = params.bookId;

  if (!bookId) return notFound();
  const { review } = body;
  const newReview = await db.insert("reviews").values({
    reviewId,
    bookId,
    review,
    userId,
  });
}
