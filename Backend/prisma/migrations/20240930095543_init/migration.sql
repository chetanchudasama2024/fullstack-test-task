/*
  Warnings:

  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[menuId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - The required column `menuId` was added to the `Menu` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_parentId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
ADD COLUMN     "menuId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_menuId_key" ON "Menu"("menuId");

-- CreateIndex
CREATE INDEX "Menu_parentId_idx" ON "Menu"("parentId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("menuId") ON DELETE SET NULL ON UPDATE CASCADE;
