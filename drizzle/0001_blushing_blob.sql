ALTER TABLE "users" RENAME TO "profiles";--> statement-breakpoint
ALTER TABLE "income" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "income" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'profiles'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "profiles" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "full_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profile_id" uuid NOT NULL;
ALTER TABLE 'income' ADD CONSTRAINT "USER_ID_REFRENCE" FOREIGN KEY ("user_id") REFERENCES "profiles"('profile_id')