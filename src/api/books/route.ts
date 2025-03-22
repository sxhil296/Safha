import { db } from "@/db";
import { Books } from "@/db/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, author, bookCategory, description, bookPDF } = body;
  const book = await db.insert(Books).values(body);
  return new Response(JSON.stringify(book), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
