import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EnquiryService } from './enquiry.service';
import { EmailService } from './email.service';

@Controller('enquiries')
export class EnquiryController {
  constructor(
    private readonly enquiryService: EnquiryService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      fullName?: string;
      email?: string;
      location?: string | null;
      message?: string;
      source?: 'CONTACT' | 'APPOINTMENT';
      subject?: string | null;
      inquiryType?: string | null;
    },
  ) {
    if (!body?.fullName || !body?.email || !body?.message) {
      throw new BadRequestException('fullName, email, and message are required');
    }
    const fullName = body.fullName;
    const email = body.email;
    const message = body.message;
    const source = body.source === 'APPOINTMENT' ? 'APPOINTMENT' : 'CONTACT';
    const created = await this.enquiryService.create({
      fullName,
      email,
      message,
      location: body.location ?? null,
      subject: body.subject ?? null,
      inquiryType: body.inquiryType ?? null,
      source,
    });
    // Do not fail submission if email delivery fails.
    this.emailService
      .sendUserConfirmation({
        to: email,
        fullName,
        source,
      })
      .catch(() => null);
    return created;
  }
}

@Controller('admin/enquiries')
export class AdminEnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list() {
    return this.enquiryService.list();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status?: 'NEW' | 'IN_PROGRESS' | 'CLOSED' },
  ) {
    if (!body?.status || !['NEW', 'IN_PROGRESS', 'CLOSED'].includes(body.status)) {
      throw new BadRequestException('Valid status is required');
    }
    return this.enquiryService.updateStatus({
      id,
      status: body.status,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.enquiryService.delete({ id });
  }
}
