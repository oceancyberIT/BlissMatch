import type { Metadata } from "next";
import "./globals.css";
import { PT_Serif } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Bliss Match — Private Matchmaking Consultancy",
  description:
    "Bliss Match is a private matchmaking consultancy in London serving global clients, specialising in intentional, values-led relationships.",
  metadataBase: new URL("https://blissmatch.com"),
  openGraph: {
    title: "Bliss Match — Private Matchmaking Consultancy",
    description:
      "Where love meets intention. Discreet, deeply human matchmaking for discerning individuals in London and worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ptSerif.className}>
      {/* <body className="antialiased bg-sand-50 text-charcoal-950">{children}</body> */}
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
