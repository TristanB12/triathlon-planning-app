/*
  Warnings:

  - Added the required column `ai_response_id` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goal" ADD COLUMN     "ai_response_id" TEXT NOT NULL;
