/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecurringRule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SportType" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('PLANNED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_recurring_rule_id_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RecurringRule" DROP CONSTRAINT "RecurringRule_user_id_fkey";

-- DropTable
DROP TABLE "Block";

-- DropTable
DROP TABLE "RecurringRule";

-- DropEnum
DROP TYPE "BlockType";

-- DropEnum
DROP TYPE "DaysOfWeek";

-- DropEnum
DROP TYPE "ReccurringRuleType";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ActivityStatus" NOT NULL DEFAULT 'PLANNED',
    "sport_type" "SportType" NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "external_source_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
