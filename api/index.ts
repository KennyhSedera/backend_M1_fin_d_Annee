import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let app: NestExpressApplication;

async function bootstrap() {
  if (app) {
    return app;
  }

  app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Important pour les fichiers statiques
  app.useStaticAssets(join(process.cwd(), 'uploads'));

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.init();

  return app;
}

export default async function handler(req: any, res: any) {
  const application = await bootstrap();

  const instance = application.getHttpAdapter().getInstance();

  return instance(req, res);
}