import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

type StoryInput = {
  quote: string;
  author: string;
  location: string;
  stars: number;
};

@Injectable()
export class SuccessStoriesService {
  async list() {
    return prisma.successStory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async replaceAll(stories: StoryInput[]) {
    await prisma.$transaction([
      prisma.successStory.deleteMany(),
      prisma.successStory.createMany({
        data: stories.map((story, index) => ({
          quote: story.quote,
          author: story.author,
          location: story.location,
          stars: story.stars,
          sortOrder: index,
        })),
      }),
    ]);

    return this.list();
  }
}

