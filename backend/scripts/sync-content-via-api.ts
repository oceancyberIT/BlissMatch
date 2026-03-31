import 'dotenv/config';

type Json = Record<string, unknown> | unknown[] | string | number | boolean | null;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

async function getJson(base: string, path: string): Promise<Json> {
  const res = await fetch(`${base}${path}`, { cache: 'no-store' });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return data as Json;
}

async function login(base: string, email: string, password: string): Promise<string> {
  const res = await fetch(`${base}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.accessToken) {
    throw new Error(`Login failed for ${base}: ${res.status}`);
  }
  return String(data.accessToken);
}

async function putJson(base: string, path: string, token: string, body: Json) {
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(
      `PUT ${path} failed: ${res.status} ${JSON.stringify(data)}`,
    );
  }
}

async function main() {
  const sourceApiBase = requiredEnv('SOURCE_API_BASE').replace(/\/+$/, '');
  const targetApiBase = requiredEnv('TARGET_API_BASE').replace(/\/+$/, '');
  const targetAdminEmail = requiredEnv('TARGET_ADMIN_EMAIL');
  const targetAdminPassword = requiredEnv('TARGET_ADMIN_PASSWORD');
  const dryRun = process.argv.includes('--dry-run');

  const [home, about, services, stories, homeHero, aboutHero, servicesHero, nav, footer, appointment, contact] =
    await Promise.all([
      getJson(sourceApiBase, '/admin/home'),
      getJson(sourceApiBase, '/admin/about-page'),
      getJson(sourceApiBase, '/admin/services-page'),
      getJson(sourceApiBase, '/admin/success-stories'),
      getJson(sourceApiBase, '/admin/hero?route=/admin/home'),
      getJson(sourceApiBase, '/admin/hero?route=/admin/about'),
      getJson(sourceApiBase, '/admin/hero?route=/admin/services'),
      getJson(sourceApiBase, '/site-settings/navigation'),
      getJson(sourceApiBase, '/site-settings/footer'),
      getJson(sourceApiBase, '/site-settings/appointment'),
      getJson(sourceApiBase, '/site-settings/contact'),
    ]);

  console.log('Loaded source API payloads.');
  if (dryRun) {
    console.log('Dry run complete. Re-run without --dry-run to apply.');
    return;
  }

  const targetToken = await login(targetApiBase, targetAdminEmail, targetAdminPassword);

  await Promise.all([
    putJson(targetApiBase, '/admin/home', targetToken, home),
    putJson(targetApiBase, '/admin/about-page', targetToken, about),
    putJson(targetApiBase, '/admin/services-page', targetToken, services),
    putJson(targetApiBase, '/admin/success-stories', targetToken, stories),
    putJson(targetApiBase, '/admin/hero', targetToken, homeHero),
    putJson(targetApiBase, '/admin/hero', targetToken, aboutHero),
    putJson(targetApiBase, '/admin/hero', targetToken, servicesHero),
    putJson(targetApiBase, '/admin/site-settings/navigation', targetToken, nav),
    putJson(targetApiBase, '/admin/site-settings/footer', targetToken, footer),
    putJson(targetApiBase, '/admin/site-settings/appointment', targetToken, appointment),
    putJson(targetApiBase, '/admin/site-settings/contact', targetToken, contact),
  ]);

  console.log('Content sync via API complete.');
}

main().catch((error) => {
  console.error('Sync via API failed:', error);
  process.exit(1);
});
