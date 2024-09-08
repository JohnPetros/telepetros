/*
  Warnings:

  - You are about to drop the column `fileId` on the `message_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `message_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `message_attachments` table. All the data in the column will be lost.
  - Added the required column `fil_url` to the `message_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_id` to the `message_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_name` to the `message_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message_attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file_name" TEXT NOT NULL,
    "fil_url" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message_attachments" ("id", "message_id") SELECT "id", "message_id" FROM "message_attachments";
DROP TABLE "message_attachments";
ALTER TABLE "new_message_attachments" RENAME TO "message_attachments";
CREATE UNIQUE INDEX "message_attachments_message_id_key" ON "message_attachments"("message_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
