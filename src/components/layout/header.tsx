import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "./container";
import { SparklesText } from "../magicui/sparkles-text";

export default function Header() {
  return (
    <header className="mt-4 mb-12 sticky top-0">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
        
              <Link href="/dashboard">
              <SparklesText text="Safha" className="text-3xl"/>
              </Link>
        
          </div>
          <div className="flex justify-center items-center gap-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
