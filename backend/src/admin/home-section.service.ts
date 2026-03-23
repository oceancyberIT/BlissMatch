import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

type UpsertHomePageInput = {
  key: string;
  content: Prisma.InputJsonValue;
};

@Injectable()
export class HomeSectionService {
  async get() {
    const page = await prisma.homePage.findUnique({
      where: { key: 'home' },
    });
    return page?.content ?? null;
  }

  async upsert(input: UpsertHomePageInput) {
    const { key, content } = input;
    const page = await prisma.homePage.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });

    return page.content;
  }
}

