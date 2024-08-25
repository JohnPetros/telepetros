-- CreateTable
CREATE TABLE "ChannelMembers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channel_chat_id" TEXT NOT NULL,
    "chatter_id" TEXT NOT NULL,
    CONSTRAINT "ChannelMembers_channel_chat_id_fkey" FOREIGN KEY ("channel_chat_id") REFERENCES "chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChannelMembers_chatter_id_fkey" FOREIGN KEY ("chatter_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
