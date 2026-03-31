import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SiteSettingsService } from './site-settings.service';

@Controller('site-settings')
export class SiteSettingsPublicController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    return this.siteSettingsService.get(key);
  }
}

@Controller('admin/site-settings')
export class SiteSettingsAdminController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get(':key')
  @UseGuards(JwtAuthGuard)
  async get(@Param('key') key: string) {
    return this.siteSettingsService.get(key);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  async upsert(@Param('key') key: string, @Body() body: unknown) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Site settings JSON body is required');
    }

    return this.siteSettingsService.upsert({
      key,
      content: body as Prisma.InputJsonValue,
    });
  }
}
