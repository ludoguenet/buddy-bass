import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.setLocal('view options', { layout: 'layout' });
  app.setLocal('myTitle', 'Bass Buddy');

  // Register partials directory
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
