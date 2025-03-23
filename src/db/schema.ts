import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Books = pgTable("books", {
  id: text("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  book: text("book"),
  userId: text("userId").notNull(),
});
