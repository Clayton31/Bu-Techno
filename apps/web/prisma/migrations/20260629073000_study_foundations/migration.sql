CREATE TYPE "StudyStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

CREATE TABLE "Study" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "status" "StudyStatus" NOT NULL DEFAULT 'DRAFT',
  "projectId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyVersion" (
  "id" TEXT NOT NULL,
  "studyId" TEXT NOT NULL,
  "number" INTEGER NOT NULL,
  "snapshot" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StudyVersion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyFile" (
  "id" TEXT NOT NULL,
  "studyId" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "storageKey" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StudyFile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyLayer" (
  "id" TEXT NOT NULL,
  "studyId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "visible" BOOLEAN NOT NULL DEFAULT true,
  "locked" BOOLEAN NOT NULL DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StudyLayer_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyVersion_studyId_number_key" ON "StudyVersion"("studyId", "number");
ALTER TABLE "Study" ADD CONSTRAINT "Study_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyVersion" ADD CONSTRAINT "StudyVersion_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyFile" ADD CONSTRAINT "StudyFile_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyLayer" ADD CONSTRAINT "StudyLayer_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
