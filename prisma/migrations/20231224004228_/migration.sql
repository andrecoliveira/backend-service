/*
  Warnings:

  - Made the column `name` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetName` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetNumber` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zipCode` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schedule` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `websitePath` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `restaurants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_userId_fkey";

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "streetName" SET NOT NULL,
ALTER COLUMN "streetNumber" SET NOT NULL,
ALTER COLUMN "zipCode" SET NOT NULL,
ALTER COLUMN "schedule" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "websitePath" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
