import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

type UpsertSiteSettingsInput = {
  key: string;
  content: Prisma.InputJsonValue;
};

@Injectable()
export class SiteSettingsService {
  async get(key: string) {
    const row = await prisma.siteSettings.findUnique({
      where: { key },
    });
    return row?.content ?? null;
  }

  async upsert(input: UpsertSiteSettingsInput) {
    const { key, content } = input;
    const row = await prisma.siteSettings.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });
    return row.content;
  }
}
