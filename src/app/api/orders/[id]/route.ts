import { NextResponse } from "next/server";
import { getOrder } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
