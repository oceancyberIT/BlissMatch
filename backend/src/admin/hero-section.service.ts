import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

type UpsertHeroSectionInput = {
  route: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  imageUrls?: string[];
};

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

@Injectable()
export class HeroSectionService {
  async getByRoute(route: string) {
    try {
      return await prisma.heroSection.findUnique({
        where: { route },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (!message.includes('imageUrls')) {
        throw error;
      }

      const legacy = await prisma.heroSection.findUnique({
        where: { route },
        select: {
          id: true,
          route: true,
          title: true,
          subtitle: true,
          body: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return legacy ? { ...legacy, imageUrls: [] } : null;
    }
  }

  async upsert(input: UpsertHeroSectionInput) {
    const { route, ...data } = input;
    try {
      return await prisma.heroSection.upsert({
        where: { route },
        create: { route, ...data },
        update: data,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (!message.includes('imageUrls')) {
        throw error;
      }

      const { imageUrls: _ignoredImageUrls, ...legacyData } = data;
      return prisma.heroSection.upsert({
        where: { route },
        create: { route, ...legacyData },
        update: legacyData,
      });
    }
  }
}

