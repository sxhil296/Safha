"use client";

import { useEffect, useState } from "react";
import BookCard from "./bookCard";
import BookCardSkeleton from "./skeletons/bookCardSkeleton";
import { Book } from "@/types";



export const categories = [
  "all",
  "religion",
  "tech",
  "fiction",
  "self-Help",
  "history",
  "science",
  "biography",
];

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const filteredBooks = selectedCategory === "all"
    ? books
    : books.filter((book) => book.category === selectedCategory);

  return (
   <section className="max-w-6xl mx-auto my-14 md:my-20">

    {/* tabs */}
    <div className="my-14 md:mt-20 md:mb-16 max-w-md mx-auto">
      <ul className="flex w-full gap-4  border-b border-b-muted justify-center items-center">
      {categories.map((category) => (
            <li
              key={category}
              className={`text-sm font-semibold cursor-pointer border-b-2 pb-2 hover:text-green text-nowrap capitalize ${
                selectedCategory === category ? "text-green  border-green" : "text-muted-foreground border-transparent"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
      </ul>
    </div>

     <div
      id="books"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl px-6 mx-auto"
    >
              {loading && Array.from({ length: 3 }).map((_, index) => <BookCardSkeleton key={index} />)}
        {!loading && filteredBooks.length === 0 && (
          <p className="text-center col-span-full text-muted-foreground md:min-h-[300px]">No books found in this category.</p>
        )}
      {filteredBooks.map((book) => (
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
