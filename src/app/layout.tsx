import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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

export const metadata: Metadata = {
  title: "Versely — Transforme Sua História em uma Música Inesquecível",
  description:
    "Conte sua história, escolha seu estilo musical favorito e receba uma música personalizada e produzida profissionalmente em até 1 hora.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Versely — Transforme Sua História em uma Música Inesquecível",
    description:
      "Conte sua história, escolha seu estilo musical favorito e receba uma música personalizada e produzida profissionalmente em até 1 hora.",
    type: "website",
  },
};

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
