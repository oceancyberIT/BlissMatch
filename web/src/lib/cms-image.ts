const CMS_IMAGE_BUSTER = `${Date.now()}`;

export function withCmsImageVersion(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("data:")) return url;
  const hasQuery = url.includes("?");
  return `${url}${hasQuery ? "&" : "?"}v=${CMS_IMAGE_BUSTER}`;
}
