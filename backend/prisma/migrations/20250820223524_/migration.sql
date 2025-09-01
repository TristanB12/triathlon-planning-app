-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('STRAVA', 'GARMIN', 'AUTH0');

-- CreateTable
CREATE TABLE "Integration" (
    "id" SERIAL NOT NULL,
    "provider" "Provider" NOT NULL,
    "provider_user_id" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" TIMESTAMP(3),
    "state" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
