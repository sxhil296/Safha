import Link from "next/link";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-300 py-4 ">
      <Container className="flex justify-between items-center text-zinc-400 text-sm">
        <div>
          &copy; <span className="text-green-400 font-medium">Safha</span>{" "}
          {new Date().getFullYear()}
        </div>
        <div>
          Designed & Developed by&nbsp;
          <Link
            href={`https://x.com/tf3mir`}
            className="underline text-green-400"
          >
            Sahil
          </Link>
        </div>
      </Container>
    </footer>
  );
}
