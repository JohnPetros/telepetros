-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chatters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_chatters" ("avatar_url", "banner_url", "email", "id", "name") SELECT "avatar_url", "banner_url", "email", "id", "name" FROM "chatters";
DROP TABLE "chatters";
ALTER TABLE "new_chatters" RENAME TO "chatters";
CREATE UNIQUE INDEX "chatters_email_key" ON "chatters"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
