import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Books = pgTable("books", {
  id: text("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  bookCategory: text("category").notNull(),
  description: text("description"),
  bookPDF:text("file"),
  userId: text("userId").notNull(),
});
