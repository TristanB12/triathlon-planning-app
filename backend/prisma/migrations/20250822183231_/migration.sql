/*
  Warnings:

  - Added the required column `goal_id` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_user_id_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "goal_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
