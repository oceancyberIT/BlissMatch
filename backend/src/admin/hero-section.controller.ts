import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/hero')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Get()
  async getByRoute(@Query('route') route?: string) {
    if (!route) {
      throw new BadRequestException('route query is required');
    }

    return this.heroSectionService.getByRoute(route);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async upsert(
    @Body()
    body: {
      route?: string;
      title?: string;
      subtitle?: string;
      body?: string;
      imageUrl?: string;
      imageUrls?: string[];
    },
  ) {
    if (!body.route) {
      throw new BadRequestException('route is required');
    }

    return this.heroSectionService.upsert({
      route: body.route,
      title: body.title ?? '',
      subtitle: body.subtitle,
      body: body.body,
      imageUrl: body.imageUrl,
      imageUrls: Array.isArray(body.imageUrls)
        ? body.imageUrls.filter((url) => typeof url === 'string')
        : [],
    });
  }
}

