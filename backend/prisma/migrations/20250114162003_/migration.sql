-- DropForeignKey
ALTER TABLE "ProjectSettings" DROP CONSTRAINT "ProjectSettings_project_id_fkey";

-- AddForeignKey
ALTER TABLE "ProjectSettings" ADD CONSTRAINT "ProjectSettings_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
