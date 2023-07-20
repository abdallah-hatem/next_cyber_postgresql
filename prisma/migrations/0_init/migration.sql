-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceTypeId" INTEGER NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devicetype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "hourRateSingle" INTEGER NOT NULL,
    "hourRateMulti" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "devicetype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Device_deviceTypeId_fkey" ON "device"("deviceTypeId");

-- CreateIndex
CREATE INDEX "Device_userId_fkey" ON "device"("userId");

-- CreateIndex
CREATE INDEX "DeviceType_userId_fkey" ON "devicetype"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "user"("email");

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "devicetype"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devicetype" ADD CONSTRAINT "devicetype_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

