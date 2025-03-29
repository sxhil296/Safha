"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BookCard from "./bookCard";
import BookCardSkeleton from "./skeletons/bookCardSkeleton";
export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  book: string;
  cover:string;
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
   <section className="max-w-6xl mx-auto my-14 md:my-20">

     <div
      id="books"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl px-6 mx-auto"
    >
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <BookCardSkeleton key={index} />)}
      {books.map((book) => (
        <BookCard
          key={book?.id}
          author={book?.author}
          category={book?.category}
          id={book?.id}
          coverUrl={book?.cover}
          title={book?.title}
        />
      ))}
    </div>
   </section>
  );
}
