import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getActiveCampaign } from "@/lib/campaigns";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const campaign = getActiveCampaign();
  const title = `Versely — ${campaign.hero.headline} ${campaign.hero.headlineHighlight}`;
  const description = campaign.hero.shareDescription ?? campaign.hero.subheadline;

  return {
    title,
    description,
    metadataBase: new URL("https://verselyapp.vercel.app"),
    openGraph: { title, description, type: "website" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
