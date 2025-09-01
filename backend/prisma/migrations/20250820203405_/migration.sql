-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('BUSY', 'TRAINING');

-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "ReccurringRuleType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "RecurringRule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "days_of_week" "DaysOfWeek"[],
    "reccurring_rule_type" "ReccurringRuleType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "RecurringRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recurring_rule_id" INTEGER,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecurringRule" ADD CONSTRAINT "RecurringRule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_recurring_rule_id_fkey" FOREIGN KEY ("recurring_rule_id") REFERENCES "RecurringRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
