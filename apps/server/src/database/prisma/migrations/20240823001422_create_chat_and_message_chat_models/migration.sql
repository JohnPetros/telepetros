/*
  Warnings:

  - Added the required column `chat_id` to the `chatter_chats` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "parent_message_id" TEXT,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "messages_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "messages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chatter_chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatter_1_id" TEXT NOT NULL,
    "chatter_2_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "chatter_chats_chatter_1_id_fkey" FOREIGN KEY ("chatter_1_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chatter_2_id_fkey" FOREIGN KEY ("chatter_2_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_chatter_chats" ("chatter_1_id", "chatter_2_id", "id") SELECT "chatter_1_id", "chatter_2_id", "id" FROM "chatter_chats";
DROP TABLE "chatter_chats";
ALTER TABLE "new_chatter_chats" RENAME TO "chatter_chats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "messages_parent_message_id_key" ON "messages"("parent_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_chat_id_key" ON "messages"("chat_id");
