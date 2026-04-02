import { fetchBackend } from "@/lib/backend-proxy";
import {
  INITIAL_ABOUT_CONTENT,
  mergeAboutContent,
} from "@/components/admin/about-editor/constants";
import type { AboutContent } from "@/components/admin/about-editor/types";
import { parseHeroSectionResponse, type HeroConfig } from "@/lib/hero-config";
import AboutPageClient from "./about-page-client";

export default async function AboutPage() {
  let initialContent: AboutContent = INITIAL_ABOUT_CONTENT;
  let initialHeroConfig: HeroConfig | undefined = undefined;

  try {
    const [aboutRes, heroRes] = await Promise.all([
      fetchBackend("/admin/about-page", { cache: "no-store" }),
      fetchBackend(
        `/admin/hero?route=${encodeURIComponent("/admin/about")}`,
        { cache: "no-store" },
      ),
    ]);

    if (aboutRes.ok) {
      const data = await aboutRes.json().catch(() => null);
      if (data && typeof data === "object" && data !== null) {
        initialContent = mergeAboutContent(data as Partial<AboutContent>);
      }
    }

    if (heroRes.ok) {
      const raw = await heroRes.json().catch(() => null);
      const parsed = parseHeroSectionResponse(raw);
      if (parsed !== null) {
        initialHeroConfig = parsed;
      }
    }
  } catch {
    // Use bundled fallbacks; client may still refetch.
  }

  return (
    <AboutPageClient
      initialContent={initialContent}
      initialHeroConfig={initialHeroConfig}
    />
  );
}
