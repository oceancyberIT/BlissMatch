import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

export type CreateMediaAssetInput = {
  name: string;
  url: string;
};

@Injectable()
export class MediaLibraryService {
  async list() {
    return prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(input: CreateMediaAssetInput) {
    return prisma.mediaAsset.create({
      data: {
        name: input.name.trim() || 'Untitled image',
        url: input.url,
      },
    });
  }

  async remove(id: string) {
    return prisma.mediaAsset.delete({
      where: { id },
    });
  }
}
