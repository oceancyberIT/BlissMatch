import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

type UpsertHeroSectionInput = {
  route: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
};

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

@Injectable()
export class HeroSectionService {
  async getByRoute(route: string) {
    return prisma.heroSection.findUnique({
      where: { route },
    });
  }

  async upsert(input: UpsertHeroSectionInput) {
    const { route, ...data } = input;
    return prisma.heroSection.upsert({
      where: { route },
      create: { route, ...data },
      update: data,
    });
  }
}

