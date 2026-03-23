import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { EnquiryStatus, PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

export type CreateEnquiryInput = {
  fullName: string;
  email: string;
  location?: string | null;
  message: string;
  source: 'CONTACT' | 'APPOINTMENT';
  subject?: string | null;
  inquiryType?: string | null;
};

export type UpdateEnquiryStatusInput = {
  id: string;
  status: EnquiryStatus;
};

export type DeleteEnquiryInput = {
  id: string;
};

@Injectable()
export class EnquiryService {
  async create(input: CreateEnquiryInput) {
    return prisma.enquiry.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        location: input.location ?? null,
        message: input.message,
        source: input.source,
        subject: input.subject ?? null,
        inquiryType: input.inquiryType ?? null,
      },
    });
  }

  async list() {
    return prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(input: UpdateEnquiryStatusInput) {
    return prisma.enquiry.update({
      where: { id: input.id },
      data: { status: input.status },
    });
  }

  async delete(input: DeleteEnquiryInput) {
    return prisma.enquiry.delete({
      where: { id: input.id },
    });
  }
}
