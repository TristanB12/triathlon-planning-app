/*
  Warnings:

  - Added the required column `database_schema` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "database_schema" JSONB NOT NULL;
