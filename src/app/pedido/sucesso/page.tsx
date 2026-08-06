import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getActiveCampaign } from "@/lib/campaigns";
import { SuccessContent } from "./success-content";

export default function OrderSuccessPage() {
  const campaign = getActiveCampaign();

  return (
    <>
      <Navbar campaign={campaign} />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-40 text-center sm:px-6 sm:pt-48 lg:px-8">
        <SuccessContent fallbackMessage={campaign.whatsappMessage} />
      </main>
      <Footer campaign={campaign} />
    </>
  );
}
