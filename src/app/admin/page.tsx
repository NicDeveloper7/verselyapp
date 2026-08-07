import { cookies } from "next/headers";
import { getAllOrders, deleteStalePendingOrders } from "@/lib/db";
import { LoginForm } from "./login-form";
import { OrdersTable } from "./orders-table";
import { LogoutButton } from "./logout-button";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authenticated = Boolean(adminPassword) && session === adminPassword;

  if (!authenticated) {
    return <LoginForm />;
  }

  // Fallback for environments without Vercel Cron configured — the
  // scheduled /api/cron/cleanup route is the primary mechanism, this
  // just also sweeps whenever someone opens the panel.
  await deleteStalePendingOrders();
  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Painel de Pedidos</h1>
          <p className="mt-1 text-sm text-muted">{orders.length} pedido(s) no total.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
