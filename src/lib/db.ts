import { createClient, type Client } from "@libsql/client";
import { randomUUID } from "crypto";

/**
 * Same client works two ways, picked purely by env vars:
 * - No TURSO_DATABASE_URL set -> embedded local file at data/orders.db
 *   (what local dev and any host with a durable disk uses).
 * - TURSO_DATABASE_URL + TURSO_AUTH_TOKEN set -> hosted Turso database
 *   (what a serverless host like Vercel needs, since its filesystem is
 *   ephemeral and a local file would silently lose every order).
 */
const url = process.env.TURSO_DATABASE_URL ?? "file:data/orders.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const db: Client = authToken ? createClient({ url, authToken }) : createClient({ url });

// busy_timeout makes SQLite retry internally (instead of failing
// immediately) when another process — e.g. one of Next's parallel build
// workers — briefly holds the lock on first open. WAL mode then keeps
// that contention rare going forward. Both are meaningless for the
// remote Turso case, which has no local file to lock.
const ready = (
  authToken
    ? Promise.resolve()
    : db.execute("pragma busy_timeout = 5000;").then(() => db.execute("pragma journal_mode = WAL;"))
).then(() =>
  db.execute(`
  create table if not exists orders (
    id text primary key,
    created_at text not null default (datetime('now')),
    plan_id text not null,
    plan_name text not null,
    price_cents integer not null,
    customer_name text not null,
    customer_whatsapp text,
    customer_email text,
    father_name text,
    story text not null,
    genre text,
    status text not null default 'pending'
      check (status in ('pending', 'approved', 'rejected', 'cancelled')),
    cakto_order_id text,
    cakto_ref_id text,
    paid_amount_cents integer,
    check (customer_whatsapp is not null or customer_email is not null)
  );
`)
  // Added after the table already existed in some environments (including
  // the live Turso DB) — "create table if not exists" above won't add a
  // column to an existing table, so these run separately and idempotently
  // (the catch just means "already there").
  .then(() => db.execute("alter table orders add column approved_at text").catch(() => {}))
  .then(() => db.execute("alter table orders add column mood text").catch(() => {}))
  .then(() => db.execute("alter table orders add column vocal_type text").catch(() => {}))
  .then(() => db.execute("alter table orders add column reference_track text").catch(() => {}))
);

export type OrderStatus = "pending" | "approved" | "rejected" | "cancelled";

export type Order = {
  id: string;
  created_at: string;
  plan_id: string;
  plan_name: string;
  price_cents: number;
  customer_name: string;
  customer_whatsapp: string | null;
  customer_email: string | null;
  father_name: string | null;
  story: string;
  genre: string | null;
  mood: string | null;
  vocal_type: string | null;
  reference_track: string | null;
  status: OrderStatus;
  cakto_order_id: string | null;
  cakto_ref_id: string | null;
  paid_amount_cents: number | null;
  approved_at: string | null;
};

export async function insertOrder(input: {
  planId: string;
  planName: string;
  priceCents: number;
  customerName: string;
  customerWhatsapp: string | null;
  customerEmail: string | null;
  fatherName: string | null;
  story: string;
  genre: string | null;
  mood: string | null;
  vocalType: string | null;
  referenceTrack: string | null;
}): Promise<Order> {
  await ready;
  const id = randomUUID();

  await db.execute({
    sql: `insert into orders
      (id, plan_id, plan_name, price_cents, customer_name, customer_whatsapp,
       customer_email, father_name, story, genre, mood, vocal_type, reference_track)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.planId,
      input.planName,
      input.priceCents,
      input.customerName,
      input.customerWhatsapp,
      input.customerEmail,
      input.fatherName,
      input.story,
      input.genre,
      input.mood,
      input.vocalType,
      input.referenceTrack,
    ],
  });

  return (await getOrder(id))!;
}

export async function getOrder(id: string): Promise<Order | null> {
  await ready;
  const rs = await db.execute({ sql: "select * from orders where id = ?", args: [id] });
  return rs.rows[0] ? (Object.fromEntries(Object.entries(rs.rows[0])) as unknown as Order) : null;
}

/** All orders still awaiting payment confirmation — small table, safe to scan in JS for matching. */
export async function getPendingOrders(): Promise<Order[]> {
  await ready;
  const rs = await db.execute("select * from orders where status = 'pending'");
  return rs.rows.map((row) => Object.fromEntries(Object.entries(row)) as unknown as Order);
}

/** Orders that never got paid within 48h of being created — abandoned checkouts, safe to drop. */
export async function deleteStalePendingOrders(): Promise<number> {
  await ready;
  const rs = await db.execute(
    "delete from orders where status = 'pending' and created_at < datetime('now', '-48 hours')"
  );
  return rs.rowsAffected;
}

/** Newest first — feeds the /admin orders panel. */
export async function getAllOrders(): Promise<Order[]> {
  await ready;
  const rs = await db.execute("select * from orders order by created_at desc");
  return rs.rows.map((row) => Object.fromEntries(Object.entries(row)) as unknown as Order);
}

export async function markOrderApproved(
  id: string,
  info: { caktoOrderId: string; caktoRefId: string; paidAmountCents: number }
) {
  await ready;
  await db.execute({
    sql: `update orders set status = 'approved', cakto_order_id = ?,
       cakto_ref_id = ?, paid_amount_cents = ?, approved_at = datetime('now') where id = ?`,
    args: [info.caktoOrderId, info.caktoRefId, info.paidAmountCents, id],
  });
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await ready;
  await db.execute({ sql: "update orders set status = ? where id = ?", args: [status, id] });
}
