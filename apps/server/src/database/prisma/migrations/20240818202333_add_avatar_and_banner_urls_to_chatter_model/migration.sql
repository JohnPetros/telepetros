/*
  Warnings:

  - Added the required column `avatar_url` to the `chatters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banner_url` to the `chatters` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chatters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL
);
INSERT INTO "new_chatters" ("email", "id", "name") SELECT "email", "id", "name" FROM "chatters";
DROP TABLE "chatters";
ALTER TABLE "new_chatters" RENAME TO "chatters";
CREATE UNIQUE INDEX "chatters_email_key" ON "chatters"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
