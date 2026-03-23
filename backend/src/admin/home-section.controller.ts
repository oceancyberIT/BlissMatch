import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HomeSectionService } from './home-section.service';

@Controller('admin/home')
export class HomeSectionController {
  constructor(private readonly homeSectionService: HomeSectionService) {}

  @Get()
  async get() {
    return this.homeSectionService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async upsert(@Body() body: any) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Home content JSON is required');
    }

    // Store the entire editor payload as JSON.
    return this.homeSectionService.upsert({
      key: 'home',
      content: body,
    });
  }
}

