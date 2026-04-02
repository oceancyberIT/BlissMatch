import { fetchBackend } from "@/lib/backend-proxy";
import {
  INITIAL_CONTENT,
  mergeHomeContent,
} from "@/components/admin/home-editor/constants";
import type { HomeContent } from "@/components/admin/home-editor/types";
import { parseHeroSectionResponse, type HeroConfig } from "@/lib/hero-config";
import {
  mapSuccessStoriesFromApi,
  SUCCESS_STORIES_FALLBACK,
  type SuccessStory,
} from "@/lib/success-stories-data";
import HomePageClient from "./home-page-client";

export default async function HomePage() {
  let homeContent: HomeContent = mergeHomeContent(INITIAL_CONTENT);
  let initialHeroConfig: HeroConfig | undefined = undefined;
  let initialSuccessStories: SuccessStory[] = SUCCESS_STORIES_FALLBACK;

  try {
    const [homeRes, heroRes, ssRes] = await Promise.all([
      fetchBackend("/admin/home", { cache: "no-store" }),
      fetchBackend(
        `/admin/hero?route=${encodeURIComponent("/admin/home")}`,
        { cache: "no-store" },
      ),
      fetchBackend("/admin/success-stories", { cache: "no-store" }),
    ]);

    if (homeRes.ok) {
      const raw = await homeRes.json().catch(() => null);
      if (raw && typeof raw === "object") {
        homeContent = mergeHomeContent(raw);
      }
    }

    if (heroRes.ok) {
      const raw = await heroRes.json().catch(() => null);
      const parsed = parseHeroSectionResponse(raw);
      if (parsed !== null) {
        initialHeroConfig = parsed;
      }
    }

    if (ssRes.ok) {
      const raw = await ssRes.json().catch(() => []);
      if (Array.isArray(raw) && raw.length) {
        initialSuccessStories = mapSuccessStoriesFromApi(raw);
      }
    }
  } catch {
    // Client may refetch
  }

  return (
    <HomePageClient
      initialHomeContent={homeContent}
      initialHeroConfig={initialHeroConfig}
      initialSuccessStories={initialSuccessStories}
    />
  );
}
