import { Injectable, Logger } from '@nestjs/common';

type SendUserConfirmationInput = {
  to: string;
  fullName: string;
  source: 'CONTACT' | 'APPOINTMENT';
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private createTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return null;
    try {
      // Keep backend booting even when nodemailer is not installed yet.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodemailer = require('nodemailer');
      return nodemailer.createTransport({
        host,
        port,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user, pass },
      });
    } catch {
      this.logger.warn('nodemailer package is not installed. Skipping confirmation email.');
      return null;
    }
  }

  async sendUserConfirmation(input: SendUserConfirmationInput) {
    const transporter = this.createTransporter();
    const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;
    if (!transporter || !from) {
      this.logger.warn('SMTP not configured. Skipping confirmation email.');
      return;
    }

    const typeLabel =
      input.source === 'APPOINTMENT' ? 'appointment request' : 'contact message';

    await transporter.sendMail({
      from,
      to: input.to,
      subject: 'We received your message - BlissMatch',
      text: `Hi ${input.fullName},\n\nThank you for your ${typeLabel}. We received it successfully and our team will get back to you shortly.\n\n- BlissMatch`,
      html: `<p>Hi ${input.fullName},</p><p>Thank you for your <strong>${typeLabel}</strong>. We received it successfully and our team will get back to you shortly.</p><p>- BlissMatch</p>`,
    });
  }
}
