// @ts-ignore
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ViewModule } from './view.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    }
  });
  await app.listen(47890);
}
async function view() {
  const app = await NestFactory.create<NestExpressApplication>(ViewModule);
  app.useStaticAssets(join(__dirname, '..', 'view'));
  await app.listen(23123);
}
bootstrap();
view();
