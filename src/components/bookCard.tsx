import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  coverUrl: string;
  title: string;
  author: string;
  category: string;
  id: string;
  keyy?: string;
}

export default function BookCard({
  coverUrl,
  id,
  title,
  author,
  category,
}: BookCardProps) {
  return (
    <Card className="w-full max-w-[300px]">
      <CardContent>
        <Link href={`/book/${id}`}>
          <Image src={coverUrl} width={300} height={300} alt={title} className="rouned" />
        </Link>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <Link href={`/book/${id}`}>
            <p className="text-lg font-medium text-green">{title}</p>
          </Link>
          <p className="text-sm font-medium text-muted-foreground mb-2">Author :  {author}</p>
          <span className="text-sm">#{category}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
