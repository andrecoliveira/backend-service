-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "category" TEXT,
    "city" TEXT,
    "state" TEXT,
    "streetName" TEXT,
    "streetNumber" TEXT,
    "streetComplement" TEXT,
    "zipCode" TEXT,
    "schedule" TEXT,
    "description" TEXT,
    "profileImage" TEXT,
    "instagramPath" TEXT,
    "websitePath" TEXT,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);
