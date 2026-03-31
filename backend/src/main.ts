import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Admin CMS sends base64 images in JSON; base64 expands payload (~4/3). 50mb allows multi-image saves.
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    // Fully open CORS for now so web ↔ API works behind Coolify
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
