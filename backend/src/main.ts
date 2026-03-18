import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // Allow configured origin(s) or fall back to permissive CORS in production
    origin: process.env.WEB_ORIGIN
      ? process.env.WEB_ORIGIN.split(',').map((o) => o.trim())
      : true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
