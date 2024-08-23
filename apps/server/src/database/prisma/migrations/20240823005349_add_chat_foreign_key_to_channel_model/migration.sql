/*
  Warnings:

  - Added the required column `chat_id` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_channels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "owner_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "channels_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "channels_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_channels" ("hash", "id", "is_public", "name", "owner_id") SELECT "hash", "id", "is_public", "name", "owner_id" FROM "channels";
DROP TABLE "channels";
ALTER TABLE "new_channels" RENAME TO "channels";
CREATE UNIQUE INDEX "channels_hash_key" ON "channels"("hash");
CREATE UNIQUE INDEX "channels_chat_id_key" ON "channels"("chat_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
