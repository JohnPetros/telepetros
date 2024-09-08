/*
  Warnings:

  - Added the required column `value` to the `message_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message_attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_message_attachments" ("id", "message_id", "name") SELECT "id", "message_id", "name" FROM "message_attachments";
DROP TABLE "message_attachments";
ALTER TABLE "new_message_attachments" RENAME TO "message_attachments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
