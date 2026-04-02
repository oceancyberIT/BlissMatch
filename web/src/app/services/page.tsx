import { fetchBackend } from "@/lib/backend-proxy";
import {
  INITIAL_CONTENT,
  mergeHomeContent,
} from "@/components/admin/home-editor/constants";
import {
  INITIAL_SERVICES_CONTENT,
  mergeServicesContent,
} from "@/components/admin/services-editor/constants";
import type { HomeContent } from "@/components/admin/home-editor/types";
import type { ServicesContent } from "@/components/admin/services-editor/types";
import { parseHeroSectionResponse, type HeroConfig } from "@/lib/hero-config";
import {
  mapSuccessStoriesFromApi,
  SUCCESS_STORIES_FALLBACK,
  type SuccessStory,
} from "@/lib/success-stories-data";
import ServicesPageClient from "./services-page-client";

export default async function ServicesPage() {
  let servicesContent: ServicesContent = mergeServicesContent(
    INITIAL_SERVICES_CONTENT,
  );
  let homeContent: HomeContent = mergeHomeContent(INITIAL_CONTENT);
  let initialSuccessStories: SuccessStory[] = SUCCESS_STORIES_FALLBACK;
  let initialHeroConfig: HeroConfig | undefined = undefined;

  try {
    const [servicesRes, homeRes, ssRes, heroRes] = await Promise.all([
      fetchBackend("/admin/services-page", { cache: "no-store" }),
      fetchBackend("/admin/home", { cache: "no-store" }),
      fetchBackend("/admin/success-stories", { cache: "no-store" }),
      fetchBackend(
        `/admin/hero?route=${encodeURIComponent("/admin/services")}`,
        { cache: "no-store" },
      ),
    ]);

    if (servicesRes.ok) {
      const raw = await servicesRes.json().catch(() => null);
      if (raw && typeof raw === "object") {
        servicesContent = mergeServicesContent(raw);
      }
    }

    if (homeRes.ok) {
      const raw = await homeRes.json().catch(() => null);
      if (raw && typeof raw === "object") {
        homeContent = mergeHomeContent(raw);
      }
    }

    if (ssRes.ok) {
      const raw = await ssRes.json().catch(() => []);
      if (Array.isArray(raw) && raw.length) {
        initialSuccessStories = mapSuccessStoriesFromApi(raw);
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
    // Client may refetch
  }

  return (
    <ServicesPageClient
      initialServices={servicesContent}
      initialHomeContent={homeContent}
      initialSuccessStories={initialSuccessStories}
      initialHeroConfig={initialHeroConfig}
    />
  );
}
