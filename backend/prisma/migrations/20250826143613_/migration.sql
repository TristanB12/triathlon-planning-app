/*
  Warnings:

  - You are about to drop the column `date` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `start_at` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goal" DROP COLUMN "date",
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;
