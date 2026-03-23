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
    if (!this.siteSettingsService.isAllowedKey(key)) {
      throw new BadRequestException('Invalid key');
    }
    return this.siteSettingsService.get(key);
  }
}

@Controller('admin/site-settings')
export class SiteSettingsAdminController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get(':key')
  @UseGuards(JwtAuthGuard)
  async get(@Param('key') key: string) {
    if (!this.siteSettingsService.isAllowedKey(key)) {
      throw new BadRequestException('Invalid key');
    }
    return this.siteSettingsService.get(key);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  async put(@Param('key') key: string, @Body() body: unknown) {
    if (!this.siteSettingsService.isAllowedKey(key)) {
      throw new BadRequestException('Invalid key');
    }
    if (body === null || typeof body !== 'object') {
      throw new BadRequestException('JSON body required');
    }
    return this.siteSettingsService.upsert(key, body as Prisma.InputJsonValue);
  }
}
