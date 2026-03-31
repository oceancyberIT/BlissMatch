import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '@prisma/client';

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function normalizeUrl(value: string, targetOrigin: string): string {
  if (!value) return value;
  if (value.startsWith('data:')) return value;
  const normalizedOrigin = targetOrigin.replace(/\/+$/, '');
  return value.replace(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i,
    normalizedOrigin,
  );
}

function normalizeJson(
  input: Prisma.JsonValue,
  targetOrigin: string,
): Prisma.InputJsonValue {
  if (typeof input === 'string') {
    return normalizeUrl(input, targetOrigin);
  }
  if (Array.isArray(input)) {
    return input.map((item) =>
      normalizeJson(item as Prisma.JsonValue, targetOrigin),
    ) as Prisma.InputJsonValue;
  }
  if (input && typeof input === 'object') {
    const out: Record<string, Prisma.InputJsonValue> = {};
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      out[key] = normalizeJson(value as Prisma.JsonValue, targetOrigin);
    }
    return out as Prisma.InputJsonValue;
  }
  return input as Prisma.InputJsonValue;
}

async function main() {
  const sourceDbUrl = requiredEnv('SOURCE_DATABASE_URL');
  const targetDbUrl = requiredEnv('TARGET_DATABASE_URL');
  const targetPublicOrigin = requiredEnv('TARGET_PUBLIC_ORIGIN');
  const dryRun = process.argv.includes('--dry-run');

  const source = new PrismaClient({
    adapter: new PrismaPg({ connectionString: sourceDbUrl }),
  });
  const target = new PrismaClient({
    adapter: new PrismaPg({ connectionString: targetDbUrl }),
  });

  try {
    const [
      heroSections,
      homePages,
      aboutPages,
      servicesPages,
      siteSettings,
      successStories,
      mediaAssets,
    ] = await Promise.all([
      source.heroSection.findMany(),
      source.homePage.findMany(),
      source.aboutPage.findMany(),
      source.servicesPage.findMany(),
      source.siteSettings.findMany(),
      source.successStory.findMany({ orderBy: { sortOrder: 'asc' } }),
      source.mediaAsset.findMany(),
    ]);

    console.log(
      `Loaded source content: hero=${heroSections.length}, home=${homePages.length}, about=${aboutPages.length}, services=${servicesPages.length}, settings=${siteSettings.length}, stories=${successStories.length}, media=${mediaAssets.length}`,
    );

    if (dryRun) {
      console.log('Dry run complete. Re-run without --dry-run to apply.');
      return;
    }

    await target.$transaction(async (tx) => {
      for (const row of heroSections) {
        await tx.heroSection.upsert({
          where: { route: row.route },
          create: {
            route: row.route,
            title: row.title,
            subtitle: row.subtitle,
            body: row.body,
            imageUrl: row.imageUrl
              ? normalizeUrl(row.imageUrl, targetPublicOrigin)
              : null,
          },
          update: {
            title: row.title,
            subtitle: row.subtitle,
            body: row.body,
            imageUrl: row.imageUrl
              ? normalizeUrl(row.imageUrl, targetPublicOrigin)
              : null,
          },
        });
      }

      for (const row of homePages) {
        await tx.homePage.upsert({
          where: { key: row.key },
          create: {
            key: row.key,
            content: normalizeJson(row.content, targetPublicOrigin),
          },
          update: {
            content: normalizeJson(row.content, targetPublicOrigin),
          },
        });
      }

      for (const row of aboutPages) {
        await tx.aboutPage.upsert({
          where: { key: row.key },
          create: {
            key: row.key,
            content: normalizeJson(row.content, targetPublicOrigin),
          },
          update: {
            content: normalizeJson(row.content, targetPublicOrigin),
          },
        });
      }

      for (const row of servicesPages) {
        await tx.servicesPage.upsert({
          where: { key: row.key },
          create: {
            key: row.key,
            content: normalizeJson(row.content, targetPublicOrigin),
          },
          update: {
            content: normalizeJson(row.content, targetPublicOrigin),
          },
        });
      }

      for (const row of siteSettings) {
        await tx.siteSettings.upsert({
          where: { key: row.key },
          create: {
            key: row.key,
            content: normalizeJson(row.content, targetPublicOrigin),
          },
          update: {
            content: normalizeJson(row.content, targetPublicOrigin),
          },
        });
      }

      await tx.successStory.deleteMany();
      if (successStories.length) {
        await tx.successStory.createMany({
          data: successStories.map((row) => ({
            quote: row.quote,
            author: row.author,
            location: row.location,
            stars: row.stars,
            sortOrder: row.sortOrder,
          })),
        });
      }

      await tx.mediaAsset.deleteMany();
      if (mediaAssets.length) {
        await tx.mediaAsset.createMany({
          data: mediaAssets.map((row) => ({
            name: row.name,
            url: normalizeUrl(row.url, targetPublicOrigin),
          })),
        });
      }
    });

    console.log('Content sync complete: target DB updated successfully.');
  } finally {
    await Promise.all([source.$disconnect(), target.$disconnect()]);
  }
}

main().catch((error) => {
  console.error('Sync failed:', error);
  process.exit(1);
});
