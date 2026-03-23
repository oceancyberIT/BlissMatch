import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

type UpsertServicesPageInput = {
  key: string;
  content: Prisma.InputJsonValue;
};

@Injectable()
export class ServicesPageService {
  async get() {
    const page = await prisma.servicesPage.findUnique({
      where: { key: 'services' },
    });
    return page?.content ?? null;
  }

  async upsert(input: UpsertServicesPageInput) {
    const { key, content } = input;
    const page = await prisma.servicesPage.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });
    return page.content;
  }
}
