import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function BookCardSkeleton() {
  return (
    <Card className="w-full max-w-[300px]">
      <CardContent className="overflow-hidden">
        <Skeleton className="h-[300px] w-[250px] rounded" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-8 rounded" />
      </CardFooter>
    </Card>
  );
}
