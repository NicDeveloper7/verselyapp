import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { MomentsGrid } from "@/components/moments-grid";
import { FeaturedCollection } from "@/components/featured-collection";
import { HowItWorks } from "@/components/how-it-works";
import { PricingPlans } from "@/components/pricing-plans";
import { StudioStory } from "@/components/studio-story";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { Statistics } from "@/components/statistics";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { getActiveCampaign } from "@/lib/campaigns";

export default function Home() {
  const campaign = getActiveCampaign();

  return (
    <>
      <Navbar campaign={campaign} />
      <main className="pb-16 md:pb-0">
        <Hero campaign={campaign} />
        <SocialProof />
        <MomentsGrid />
        <FeaturedCollection campaign={campaign} />
        <HowItWorks />
        <PricingPlans campaign={campaign} />
        <StudioStory />
        <WhyChooseUs />
        <Testimonials testimonials={campaign.testimonials} />
        <Statistics />
        <FAQ />
        <FinalCTA campaign={campaign} />
      </main>
      <Footer campaign={campaign} />
      <StickyMobileCTA campaign={campaign} />
    </>
  );
}
