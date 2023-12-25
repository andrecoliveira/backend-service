/*
  Warnings:

  - You are about to drop the column `profileImage` on the `restaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "profileImage";

-- CreateTable
CREATE TABLE "restaurant_profile_images" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "restaurant_profile_images_pkey" PRIMARY KEY ("id")
);
