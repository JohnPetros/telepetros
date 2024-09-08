/*
  Warnings:

  - Added the required column `size` to the `message_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message_attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message_attachments" ("file_id", "file_url", "id", "message_id", "name") SELECT "file_id", "file_url", "id", "message_id", "name" FROM "message_attachments";
DROP TABLE "message_attachments";
ALTER TABLE "new_message_attachments" RENAME TO "message_attachments";
CREATE UNIQUE INDEX "message_attachments_message_id_key" ON "message_attachments"("message_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
