/*
  Warnings:

  - You are about to drop the column `is_online` on the `ChannelMembers` table. All the data in the column will be lost.
  - You are about to drop the column `chatter_1_id` on the `chatter_chats` table. All the data in the column will be lost.
  - You are about to drop the column `chatter_2_id` on the `chatter_chats` table. All the data in the column will be lost.
  - Added the required column `chatter_id` to the `chatter_chats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChannelMembers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channel_chat_id" TEXT NOT NULL,
    "chatter_id" TEXT NOT NULL,
    CONSTRAINT "ChannelMembers_channel_chat_id_fkey" FOREIGN KEY ("channel_chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChannelMembers_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChannelMembers" ("channel_chat_id", "chatter_id", "id") SELECT "channel_chat_id", "chatter_id", "id" FROM "ChannelMembers";
DROP TABLE "ChannelMembers";
ALTER TABLE "new_ChannelMembers" RENAME TO "ChannelMembers";
CREATE TABLE "new_chatter_chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatter_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "chatter_chats_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_chatter_chats" ("chat_id", "id") SELECT "chat_id", "id" FROM "chatter_chats";
DROP TABLE "chatter_chats";
ALTER TABLE "new_chatter_chats" RENAME TO "chatter_chats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
