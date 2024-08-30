/*
  Warnings:

  - You are about to drop the column `hash` on the `channels` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_channels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "invite_code" TEXT NOT NULL DEFAULT '',
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "owner_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "channels_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "channels_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_channels" ("avatar", "chat_id", "id", "is_public", "name", "owner_id") SELECT "avatar", "chat_id", "id", "is_public", "name", "owner_id" FROM "channels";
DROP TABLE "channels";
ALTER TABLE "new_channels" RENAME TO "channels";
CREATE UNIQUE INDEX "channels_name_key" ON "channels"("name");
CREATE UNIQUE INDEX "channels_invite_code_key" ON "channels"("invite_code");
CREATE UNIQUE INDEX "channels_chat_id_key" ON "channels"("chat_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
