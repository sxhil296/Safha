"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/types";
import { useSession } from "@clerk/nextjs";
import { Calendar, Download, Tag } from "lucide-react";
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
  // const { session } = useSession();
  const [isImageLoading, setIsImageLoading] = useState(true)

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

  console.log(book)
  // console.log(session?.user);

  return (
    <section className="w-full md:max-w-7xl my-20  mx-auto px-4 flex justify-center items-center md:items-start">
    <div className="overflow-hidden w-full">
   
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Book Cover Column */}
          <div className="w-full md:max-w-[280px] px-4 rounded-md">
            <div className="relative aspect-[2/3] w-full md:h-full overflow-hidden rounded-md">
              {isImageLoading && <Skeleton className="absolute inset-0 z-10" />}
              <Image
                src={book?.cover || "/placeholder.svg?height=600&width=400"}
                alt={book?.title || "Book cover"}
                fill
                className="object-cover transition-all duration-300 hover:scale-105 rounded-md"
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            </div>
          </div>

          {/* Book Details Column */}
          <div className="w-full md:w-3/5 lg:w-2/3  flex flex-col">
            <div className="flex flex-col gap-4 flex-grow">
              {/* Title and Author */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{book?.title}</h1>
                <p className="text-lg md:text-xl text-muted-foreground">Author :  {book?.author}</p>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 my-2">
             
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {book?.category}
                  </Badge>
             
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {book?.createTs}
                  </Badge>
         
                {/* {book?.pages && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {book.pages} pages
                  </Badge>
                )} */}
              </div>

              {/* Rating */}
              {/* {book?.rating && (
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : i < book.rating
                            ? "text-yellow-500 fill-yellow-500 opacity-50"
                            : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{book.rating}/5</span>
                </div>
              )} */}

              {/* Description */}
              <div className="my-4 flex-grow">
                <h2 className="text-lg font-medium mb-2">About this book</h2>
                <p className="text-muted-foreground leading-relaxed">{book?.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {book?.book && (
                <Button size="lg" className="gap-2 flex-1 px-4 py-2" asChild>
                 <Link href={book?.book}> <Download className="h-4 w-4" />
                 Download & Read</Link>
                </Button>
              )}
              {/* <Button variant="outline" size="lg" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button> */}
            </div>
          </div>
        </div>
  
    </div>
  </section>
  );
}
