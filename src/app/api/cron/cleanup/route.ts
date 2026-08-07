import { NextResponse } from "next/server";
import { deleteStalePendingOrders } from "@/lib/db";

/**
 * Vercel Cron calls this on a schedule (see vercel.json) and automatically
 * sends `Authorization: Bearer $CRON_SECRET` when that env var is set —
 * that's what keeps this from being a public "delete my pending orders"
 * endpoint anyone could hit.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteStalePendingOrders();
  return NextResponse.json({ deleted });
}
