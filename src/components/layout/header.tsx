import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "./container";

export default function Header() {
  return (
    <header className="mt-4 mb-12 sticky top-0">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="font-bold text-2xl">
              <Link href="/dashboard">Safha</Link>
            </p>
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
