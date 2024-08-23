-- CreateTable
CREATE TABLE "chatter_chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatter_1_id" TEXT NOT NULL,
    "chatter_2_id" TEXT NOT NULL,
    CONSTRAINT "chatter_chats_chatter_1_id_fkey" FOREIGN KEY ("chatter_1_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chatter_chats_chatter_2_id_fkey" FOREIGN KEY ("chatter_2_id") REFERENCES "chatters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
