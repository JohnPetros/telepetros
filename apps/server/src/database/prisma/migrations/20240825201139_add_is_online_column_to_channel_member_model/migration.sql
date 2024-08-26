-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChannelMembers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channel_chat_id" TEXT NOT NULL,
    "chatter_id" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ChannelMembers_channel_chat_id_fkey" FOREIGN KEY ("channel_chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChannelMembers_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChannelMembers" ("channel_chat_id", "chatter_id", "id") SELECT "channel_chat_id", "chatter_id", "id" FROM "ChannelMembers";
DROP TABLE "ChannelMembers";
ALTER TABLE "new_ChannelMembers" RENAME TO "ChannelMembers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
