import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../db";

export async function DELETE(
  req: NextRequest,
  { params }: any,
  res: NextResponse
) {
  const id = Number(params.id);

  const device = await prisma.device.delete({
    where: { id },
  });

  if (!device) {
    return NextResponse.json(
      { message: "ERROR!" }
      // { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Device deleted successfully" },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest,
  { params }: any,
  res: NextResponse
) {
  const userId = Number(params.id);

  const devices = await prisma.device.findMany({
    where: { userId },
    include: { devicetype: true },
  });

  if (!devices) {
    return NextResponse.json(
      { message: "ERROR!" }
      // { status: 404 }
    );
  }

  return NextResponse.json({ data: devices }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: any,
  res: NextResponse
) {
  const id = Number(params.id);

  const dataToUpdate = await req.json();

  if (!dataToUpdate) {
    return NextResponse.json({ message: "ERROR!" });
  }

  const device = await prisma.device.update({
    where: { id },
    data: { ...dataToUpdate },
  });

  if (!device) {
    return NextResponse.json({ message: "ERROR!" });
  }

  return NextResponse.json(
    { message: "Device updated successfully" },
    { status: 200 }
  );
}
