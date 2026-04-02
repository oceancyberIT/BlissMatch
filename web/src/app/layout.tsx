import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { PT_Serif } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import { fetchBackend } from "@/lib/backend-proxy";
import { mergeFooter, mergeNavigation } from "@/lib/site-settings-merge";
import {
  INITIAL_FOOTER,
  INITIAL_NAVIGATION,
} from "@/lib/site-settings-defaults";
import type { FooterContent, NavigationContent } from "@/lib/site-settings-types";

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "https";
  const metadataBase = host
    ? new URL(`${protocol}://${host}`)
    : new URL(
        process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.NEXT_PUBLIC_APP_URL ||
          "https://blissmatch.com",
      );

  return {
    title: "Bliss Match — Private Matchmaking Consultancy",
    description:
      "Bliss Match is a private matchmaking consultancy in London serving global clients, specialising in intentional, values-led relationships.",
    metadataBase,
    icons: {
      icon: [{ url: "/logo1.png", sizes: "32x32", type: "image/png" }],
      shortcut: [{ url: "/logo1.png", sizes: "32x32", type: "image/png" }],
      apple: [{ url: "/logo1.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: "Bliss Match — Private Matchmaking Consultancy",
      description:
        "Where love meets intention. Discreet, deeply human matchmaking for discerning individuals in London and worldwide.",
      type: "website",
      siteName: "BlissMatch",
      images: [
        {
          url: "/logo1.png",
          width: 1200,
          height: 630,
          alt: "BlissMatch",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bliss Match — Private Matchmaking Consultancy",
      description:
        "Where love meets intention. Discreet, deeply human matchmaking for discerning individuals in London and worldwide.",
      images: ["/logo1.png"],
    },
  };
}

async function loadSiteShell() {
  let navigation: NavigationContent = INITIAL_NAVIGATION;
  let footer: FooterContent = INITIAL_FOOTER;
  try {
    const [navRes, footerRes] = await Promise.all([
      fetchBackend("/site-settings/navigation", { cache: "no-store" }),
      fetchBackend("/site-settings/footer", { cache: "no-store" }),
    ]);
    if (navRes.ok) {
      const raw = await navRes.json().catch(() => null);
      navigation = mergeNavigation(raw);
    }
    if (footerRes.ok) {
      const raw = await footerRes.json().catch(() => null);
      footer = mergeFooter(raw);
    }
  } catch {
    // Keep defaults
  }
  return { navigation, footer };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navigation, footer } = await loadSiteShell();

  return (
    <html lang="en" className={ptSerif.className}>
      {/* <body className="antialiased bg-sand-50 text-charcoal-950">{children}</body> */}
      <body>
        <Header
          initialNavigation={navigation}
          initialFooterSocial={footer.social}
        />
        <main>{children}</main>
        <Footer initialFooter={footer} />
      </body>
    </html>
  );
}
