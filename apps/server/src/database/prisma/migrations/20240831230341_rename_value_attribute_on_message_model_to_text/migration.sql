/*
  Warnings:

  - You are about to drop the column `value` on the `messages` table. All the data in the column will be lost.
  - Added the required column `text` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "parent_message_id" TEXT,
    "chat_id" TEXT NOT NULL,
    "chatter_id" TEXT NOT NULL,
    "sent_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "messages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "messages_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("chat_id", "chatter_id", "id", "parent_message_id", "sent_at", "type") SELECT "chat_id", "chatter_id", "id", "parent_message_id", "sent_at", "type" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
CREATE UNIQUE INDEX "messages_parent_message_id_key" ON "messages"("parent_message_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
