
import BookList from "@/components/bookList";
import HeroSection from "@/components/hero";
// import { db } from "@/db";
// import { sql } from "drizzle-orm";

export default async function Home() {
  // const results = await db.execute(sql`SELECT current_database()`);
  return (
    <main>
      <HeroSection />
      {/* {JSON.stringify(results)} */}
      <BookList />
  
    </main>
  );
}
