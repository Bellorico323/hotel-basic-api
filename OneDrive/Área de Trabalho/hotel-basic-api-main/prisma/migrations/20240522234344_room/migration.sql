-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "id_quarto" TEXT NOT NULL,
    "id_hóspede" TEXT NOT NULL,
    "data_checkin" TIMESTAMP(3) NOT NULL,
    "data_checkout" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_id_quarto_fkey" FOREIGN KEY ("id_quarto") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_id_hóspede_fkey" FOREIGN KEY ("id_hóspede") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
