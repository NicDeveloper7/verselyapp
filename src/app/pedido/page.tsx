import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getActiveCampaign } from "@/lib/campaigns";
import { OrderForm } from "./order-form";

export default function PedidoPage() {
  const campaign = getActiveCampaign();

  return (
    <>
      <Navbar campaign={campaign} />
      <main className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={`absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full ${campaign.theme.blobPrimary} blur-[120px]`}
          />
        </div>
        <Suspense fallback={<div className="h-[600px]" aria-hidden />}>
          <OrderForm campaign={campaign} />
        </Suspense>
      </main>
      <Footer campaign={campaign} />
    </>
  );
}
