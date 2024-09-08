/*
  Warnings:

  - A unique constraint covering the columns `[message_id]` on the table `message_attachments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "message_attachments_message_id_key" ON "message_attachments"("message_id");
