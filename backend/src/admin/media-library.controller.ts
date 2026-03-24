import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MediaLibraryService } from './media-library.service';

@Controller('admin/media')
@UseGuards(JwtAuthGuard)
export class MediaLibraryController {
  constructor(private readonly mediaLibraryService: MediaLibraryService) {}

  @Get()
  async list() {
    return this.mediaLibraryService.list();
  }

  @Post()
  async create(@Body() body: { name?: string; url?: string }) {
    const url = body?.url?.trim();
    if (!url) {
      throw new BadRequestException('Image url is required');
    }
    return this.mediaLibraryService.create({
      name: body?.name?.trim() || 'Library image',
      url,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mediaLibraryService.remove(id);
  }
}
