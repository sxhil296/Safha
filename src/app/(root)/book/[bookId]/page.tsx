"use client";
import { Book } from "@/components/bookList";
import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
      // console.log(data)
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
  // console.log(session?.user);

  return (
    <section className="max-w-7xl my-20 mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-6 md:justify-between items-start">
        <div className="w-full md:w-1/2">
          <Image src={book?.cover || "/placeholder-image.jpg"} alt={book?.title || "Book cover"} width={400} height={500} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-6">
          <h2 className="text-2xl md:text-2xl font-medium">{book?.title}</h2>
          <p className="text-xl">By : {book?.author}</p>
          <p className="text-lg">{book?.description}</p>
          {book && (
            <Button asChild>
              <Link href={book.book} target="_blank">
                Download & Read
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
