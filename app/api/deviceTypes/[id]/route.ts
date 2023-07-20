import { prisma } from "../../../../db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  res: NextResponse,
  { params }: any,
  req: NextRequest
) {
  const id = Number(params.id);

  const deleteType = await prisma.devicetype.delete({
    where: { id },
  });

  if (!deleteType) {
    return NextResponse.json(
      { message: "ERROR!" }
      // { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "type deleted successfully" },
    { status: 200 }
  );
}

export async function GET(
  res: NextResponse,
  { params }: any,
  req: NextRequest
) {
  const userId = Number(params.id);

  const types = await prisma.devicetype.findMany({ where: { userId } });

  if (!types) {
    return NextResponse.json(
      { message: "ERROR! no types found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: types }, { status: 200 });
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
  
  const device = await prisma.devicetype.update({
    where: { id },
    data: { ...dataToUpdate },
  });

  if (!device) {
    return NextResponse.json({ message: "ERROR!" });
  }

  return NextResponse.json(
    { message: "Device type updated successfully" },
    { status: 200 }
  );
}
