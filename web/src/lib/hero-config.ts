/** Shared hero section shape (Hero Sections admin). Safe to import from Server Components. */

export type HeroConfig = {
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  imageUrls?: string[];
};

export function parseHeroSectionResponse(data: unknown): HeroConfig | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const imageUrls = Array.isArray(d.imageUrls)
    ? d.imageUrls.filter((url): url is string => typeof url === "string")
    : [];
  return {
    title: typeof d.title === "string" ? d.title : undefined,
    subtitle: typeof d.subtitle === "string" ? d.subtitle : undefined,
    body: typeof d.body === "string" ? d.body : undefined,
    imageUrl: typeof d.imageUrl === "string" ? d.imageUrl : undefined,
    imageUrls,
  };
}
