import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { HeroSectionController } from './hero-section.controller';
import { HeroSectionService } from './hero-section.service';
import { HomeSectionController } from './home-section.controller';
import { HomeSectionService } from './home-section.service';
import { SuccessStoriesController } from './success-stories.controller';
import { SuccessStoriesService } from './success-stories.service';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { ServicesPageController } from './services-page.controller';
import { ServicesPageService } from './services-page.service';
import { AdminEnquiryController, EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';
import { EmailService } from './email.service';
import {
  SiteSettingsAdminController,
  SiteSettingsPublicController,
} from './site-settings.controller';
import { SiteSettingsService } from './site-settings.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AdminController,
    HeroSectionController,
    HomeSectionController,
    AboutPageController,
    ServicesPageController,
    SuccessStoriesController,
    EnquiryController,
    AdminEnquiryController,
    SiteSettingsPublicController,
    SiteSettingsAdminController,
  ],
  providers: [
    HeroSectionService,
    HomeSectionService,
    AboutPageService,
    ServicesPageService,
    SuccessStoriesService,
    EnquiryService,
    EmailService,
    SiteSettingsService,
  ],
})
export class AdminModule {}

