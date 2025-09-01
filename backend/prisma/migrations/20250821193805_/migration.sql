-- CreateEnum
CREATE TYPE "SportLevel" AS ENUM ('NEW', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "TriathlonDistance" AS ENUM ('SPRINT', 'OLYMPIC', 'HALF_IRONMAN', 'IRONMAN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "bike_level" "SportLevel",
ADD COLUMN     "number_days_available_per_week" INTEGER,
ADD COLUMN     "run_level" "SportLevel",
ADD COLUMN     "swim_level" "SportLevel";

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "distance_type" "TriathlonDistance" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
