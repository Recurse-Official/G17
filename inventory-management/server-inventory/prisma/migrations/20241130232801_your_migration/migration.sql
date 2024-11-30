/*
  Warnings:

  - You are about to drop the `Demo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Demo";

-- CreateTable
CREATE TABLE "demand" (
    "product" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "available" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demand_pkey" PRIMARY KEY ("product")
);
