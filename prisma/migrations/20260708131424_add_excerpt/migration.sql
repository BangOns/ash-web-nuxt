/*
  Warnings:

  - Added the required column `excerpt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_News" ("category", "content", "createdAt", "id", "slug", "status", "thumbnail", "title", "totalViews") SELECT "category", "content", "createdAt", "id", "slug", "status", "thumbnail", "title", "totalViews" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
