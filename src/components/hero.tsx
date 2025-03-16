import { cn } from "@/lib/utils";
import Container from "./layout/container";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <main className="w-full">
      <Container className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing Safha</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
          <AuroraText>Share Books, Spread Knowledge</AuroraText>
        </h1>
        <p className="max-w-5xl text-center text-lg  text-zinc-500">
          Safha is your space to share, discover, and explore books. Upload your
          favorite PDFs, download new reads, and leave reviews to help others
          find the best titles. Rate and upvote books to shape the library. Join
          Safha – where every book finds its reader.
        </p>
        <Button>Add a Book</Button>
      </Container>
    </main>
  );
}
