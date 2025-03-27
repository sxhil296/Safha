"use client";
import { Book } from "@/components/bookList";
import { useSession } from "@clerk/nextjs";

import { use, useEffect, useState } from "react";

export default function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = use(params);
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  const fetchBookById = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();
      console.log(data);
      setBook(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  // console.log(book)
  console.log(session?.user);

  return (
    <section className="max-w-6xl my-20">
      <div>
        <h2>{book?.title}</h2>
        <p>{book?.author}</p>
        <p>{book?.description}</p>
        <p>{session?.user.firstName}</p>
      </div>
    </section>
  );
}
