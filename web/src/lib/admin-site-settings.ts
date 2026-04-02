export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('blissmatch_admin_token');
}

export async function fetchAdminSiteSettings(key: string): Promise<Response> {
  const token = getAdminToken();
  return fetch(`/api/admin/site-settings/${encodeURIComponent(key)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  });
}

export async function putAdminSiteSettings(key: string, body: unknown): Promise<Response> {
  const token = getAdminToken();
  return fetch(`/api/admin/site-settings/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}
