CREATE TABLE "books" (
	"id" text PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"book" text,
	"cover" text,
	"userId" text NOT NULL
);
