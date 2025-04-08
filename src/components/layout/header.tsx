"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { SparklesText } from "../magicui/sparkles-text";
import {  SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-6xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/">
                <SparklesText text="Safha" className="text-2xl" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="flex justify-center items-center gap-2">
                  {/* <div className={cn(isScrolled && "lg:hidden")}>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div> */}
                  <div className={cn(isScrolled && "lg:hidden")}>
                    <SignedOut>
                      <Button variant="default" asChild>
                        <Link href="/sign-in">Upload a Book</Link>
                      </Button>
                    </SignedOut>

                    <div className="flex  justify-start items-start  flex-col md:flex-row gap-3">
                      {/* <SignedIn>
                        <Link href="/my-books"      onClick={() => setMenuState(false)}>
                          <span
                            className={`font-normal text-lg hover:text-[#b0e681] ${
                              pathname === "my-books" && "text-[#b0e681]"
                            }`}
                          >
                            My Books
                          </span>
                        </Link>
                      </SignedIn> */}
                      <SignedIn>
                        <Link href="/add-book"     onClick={() => setMenuState(false)}>
                          <span
                            className={`font-normal text-lg hover:text-[#b0e681] ${
                              pathname === "add-book" && "text-[#b0e681]"
                            }`}
                          >
                            Upload Book
                          </span>
                        </Link>
                      </SignedIn>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
