-- AlterTable
ALTER TABLE "public"."Activity" ALTER COLUMN "start_at" DROP NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL;
