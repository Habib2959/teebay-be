/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "buys" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rents" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "renterUserId" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "rentalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "buys_productId_idx" ON "buys"("productId");

-- CreateIndex
CREATE INDEX "buys_buyerId_idx" ON "buys"("buyerId");

-- CreateIndex
CREATE INDEX "buys_sellerId_idx" ON "buys"("sellerId");

-- CreateIndex
CREATE INDEX "rents_productId_idx" ON "rents"("productId");

-- CreateIndex
CREATE INDEX "rents_renterUserId_idx" ON "rents"("renterUserId");

-- CreateIndex
CREATE INDEX "rents_ownerUserId_idx" ON "rents"("ownerUserId");

-- CreateIndex
CREATE INDEX "rents_startDate_idx" ON "rents"("startDate");

-- CreateIndex
CREATE INDEX "rents_endDate_idx" ON "rents"("endDate");

-- AddForeignKey
ALTER TABLE "buys" ADD CONSTRAINT "buys_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buys" ADD CONSTRAINT "buys_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buys" ADD CONSTRAINT "buys_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_renterUserId_fkey" FOREIGN KEY ("renterUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
