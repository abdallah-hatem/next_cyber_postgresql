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
