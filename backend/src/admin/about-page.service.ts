import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

type UpsertAboutPageInput = {
  key: string;
  content: Prisma.InputJsonValue;
};

@Injectable()
export class AboutPageService {
  async get() {
    const page = await prisma.aboutPage.findUnique({
      where: { key: 'about' },
    });
    return page?.content ?? null;
  }

  async upsert(input: UpsertAboutPageInput) {
    const { key, content } = input;
    const page = await prisma.aboutPage.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });
    return page.content;
  }
}

