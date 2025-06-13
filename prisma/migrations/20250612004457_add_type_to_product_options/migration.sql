/*
  Warnings:

  - Added the required column `type` to the `ProductOption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductOptionType" AS ENUM ('size', 'ingredient');

-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "type" "ProductOptionType" NOT NULL;
