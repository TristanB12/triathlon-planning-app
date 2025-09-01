/*
  Warnings:

  - You are about to drop the column `goal_id` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_goal_id_fkey";

-- AlterTable
ALTER TABLE "public"."Activity" DROP COLUMN "goal_id";
