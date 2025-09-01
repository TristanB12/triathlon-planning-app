/*
  Warnings:

  - Added the required column `estimated_duration` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Activity" ADD COLUMN     "estimated_duration" INTEGER NOT NULL;
