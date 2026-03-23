import { BadRequestException, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SuccessStoriesService } from './success-stories.service';

@Controller('admin/success-stories')
export class SuccessStoriesController {
  constructor(private readonly successStoriesService: SuccessStoriesService) {}

  @Get()
  async list() {
    return this.successStoriesService.list();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async replaceAll(
    @Body()
    body: {
      stories?: Array<{
        quote?: string;
        author?: string;
        location?: string;
        stars?: number;
      }>;
    },
  ) {
    const stories = body.stories ?? [];
    if (!Array.isArray(stories)) {
      throw new BadRequestException('stories must be an array');
    }

    const sanitized = stories.map((story) => ({
      quote: (story.quote ?? '').trim(),
      author: (story.author ?? '').trim(),
      location: (story.location ?? '').trim(),
      stars: Math.max(1, Math.min(5, Number(story.stars ?? 5))),
    }));

    return this.successStoriesService.replaceAll(sanitized);
  }
}

