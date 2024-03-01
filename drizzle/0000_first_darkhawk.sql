CREATE TABLE IF NOT EXISTS "income" (
	"income_id" serial PRIMARY KEY NOT NULL,
	"article" text,
	"price" numeric,
	"date" date,
	"time" time,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"profile_id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text,
	"p_no" varchar(10)
	 
);
