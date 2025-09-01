/*
  Warnings:

  - Added the required column `planned_on` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Activity" ADD COLUMN     "planned_on" TIMESTAMP(3) NOT NULL;
