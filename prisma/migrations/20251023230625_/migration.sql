-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "purchasePrice" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "products_status_idx" ON "products"("status");
