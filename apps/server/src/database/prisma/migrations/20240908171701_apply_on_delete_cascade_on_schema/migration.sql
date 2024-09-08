-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chatter_chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatter_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "chatter_chats_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chatter_chats" ("chat_id", "chatter_id", "id") SELECT "chat_id", "chatter_id", "id" FROM "chatter_chats";
DROP TABLE "chatter_chats";
ALTER TABLE "new_chatter_chats" RENAME TO "chatter_chats";
CREATE TABLE "new_message_attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message_attachments" ("id", "message_id", "name", "value") SELECT "id", "message_id", "name", "value" FROM "message_attachments";
DROP TABLE "message_attachments";
ALTER TABLE "new_message_attachments" RENAME TO "message_attachments";
CREATE UNIQUE INDEX "message_attachments_message_id_key" ON "message_attachments"("message_id");
CREATE TABLE "new_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "parent_message_id" TEXT,
    "chat_id" TEXT NOT NULL,
    "chatter_id" TEXT NOT NULL,
    "sent_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "messages_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("chat_id", "chatter_id", "id", "parent_message_id", "sent_at", "text") SELECT "chat_id", "chatter_id", "id", "parent_message_id", "sent_at", "text" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
CREATE UNIQUE INDEX "messages_parent_message_id_key" ON "messages"("parent_message_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
