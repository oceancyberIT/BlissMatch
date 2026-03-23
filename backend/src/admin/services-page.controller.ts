import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServicesPageService } from './services-page.service';

@Controller('admin/services-page')
export class ServicesPageController {
  constructor(private readonly servicesPageService: ServicesPageService) {}

  @Get()
  async get() {
    return this.servicesPageService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async upsert(@Body() body: any) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Services content JSON is required');
    }

    return this.servicesPageService.upsert({
      key: 'services',
      content: body,
    });
  }
}
