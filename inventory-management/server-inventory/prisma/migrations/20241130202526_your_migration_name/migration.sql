-- CreateTable
CREATE TABLE "Demo" (
    "product" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "available" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demo_pkey" PRIMARY KEY ("product")
);
