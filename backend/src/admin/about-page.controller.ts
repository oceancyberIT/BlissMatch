import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AboutPageService } from './about-page.service';

@Controller('admin/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  async get() {
    return this.aboutPageService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async upsert(@Body() body: any) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('About content JSON is required');
    }

    return this.aboutPageService.upsert({
      key: 'about',
      content: body,
    });
  }
}

