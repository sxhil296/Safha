"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  book: string;
  userId: string;
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const booksData = await response.json();
      console.log(booksData);
      setBooks(booksData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl px-6 mx-auto">
      {books.map((book) => (
        <div
          key={book.id}
          className="border rounded-md shadow-md p-4 text-white"
        >
          <Image src={book.book} width={200} height={300} alt={book.title} />
          <p>{book.title}</p>
        </div>
      ))}
    </div>
  );
}
