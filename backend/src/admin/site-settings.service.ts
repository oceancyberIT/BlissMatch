import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

const ALLOWED_KEYS = ['navigation', 'footer', 'appointment', 'contact'] as const;
export type SiteSettingsKey = (typeof ALLOWED_KEYS)[number];

@Injectable()
export class SiteSettingsService {
  isAllowedKey(key: string): key is SiteSettingsKey {
    return ALLOWED_KEYS.includes(key as SiteSettingsKey);
  }

  async get(key: string) {
    if (!this.isAllowedKey(key)) return null;
    const row = await prisma.siteSettings.findUnique({ where: { key } });
    return row?.content ?? null;
  }

  async upsert(key: string, content: Prisma.InputJsonValue) {
    if (!this.isAllowedKey(key)) {
      throw new Error('Invalid site settings key');
    }
    const row = await prisma.siteSettings.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });
    return row.content;
  }
}
