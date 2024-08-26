/*
  Warnings:

  - You are about to drop the column `is_online` on the `chatter_chats` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chatter_chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatter_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "chatter_chats_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_chatter_chats" ("chat_id", "chatter_id", "id") SELECT "chat_id", "chatter_id", "id" FROM "chatter_chats";
DROP TABLE "chatter_chats";
ALTER TABLE "new_chatter_chats" RENAME TO "chatter_chats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
