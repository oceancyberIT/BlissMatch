const CMS_IMAGE_BUSTER = `${Date.now()}`;

export function withCmsImageVersion(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("data:")) return url;
  // Next.js local static images (`/foo.jpg`) disallow query strings unless explicitly configured.
  // Keep local paths untouched to avoid build-time `images.localPatterns` errors.
  if (url.startsWith("/")) return url;
  const hasQuery = url.includes("?");
  return `${url}${hasQuery ? "&" : "?"}v=${CMS_IMAGE_BUSTER}`;
}
