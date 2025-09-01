/*
  Warnings:

  - Added the required column `end_at` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goal" ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "start_at" SET DEFAULT CURRENT_TIMESTAMP;
