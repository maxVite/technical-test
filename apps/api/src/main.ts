import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const FRONTEND_URL = config.get('FRONTEND_URL');
  app.enableCors({
    origin: [FRONTEND_URL],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
