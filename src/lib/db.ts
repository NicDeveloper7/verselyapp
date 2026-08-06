import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "orders.db");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
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
    -- Filled in once the Cakto webhook matches this order to a real payment.
    cakto_order_id text,
    cakto_ref_id text,
    paid_amount_cents integer,
    check (customer_whatsapp is not null or customer_email is not null)
  );
`);

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
  status: OrderStatus;
  cakto_order_id: string | null;
  cakto_ref_id: string | null;
  paid_amount_cents: number | null;
};

export function insertOrder(input: {
  planId: string;
  planName: string;
  priceCents: number;
  customerName: string;
  customerWhatsapp: string | null;
  customerEmail: string | null;
  fatherName: string | null;
  story: string;
  genre: string | null;
}): Order {
  const id = randomUUID();

  db.prepare(
    `insert into orders
      (id, plan_id, plan_name, price_cents, customer_name, customer_whatsapp,
       customer_email, father_name, story, genre)
     values
      (@id, @planId, @planName, @priceCents, @customerName, @customerWhatsapp,
       @customerEmail, @fatherName, @story, @genre)`
  ).run({ id, ...input });

  return getOrder(id)!;
}

export function getOrder(id: string): Order | null {
  return (db.prepare("select * from orders where id = ?").get(id) as Order | undefined) ?? null;
}

/** All orders still awaiting payment confirmation — small table, safe to scan in JS for matching. */
export function getPendingOrders(): Order[] {
  return db.prepare("select * from orders where status = 'pending'").all() as Order[];
}

export function markOrderApproved(
  id: string,
  info: { caktoOrderId: string; caktoRefId: string; paidAmountCents: number }
) {
  db.prepare(
    `update orders set status = 'approved', cakto_order_id = @caktoOrderId,
       cakto_ref_id = @caktoRefId, paid_amount_cents = @paidAmountCents where id = @id`
  ).run({ id, ...info });
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  db.prepare("update orders set status = ? where id = ?").run(status, id);
}
