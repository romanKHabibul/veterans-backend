import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix("api")
  await app.listen(1000, "0.0.0.0", () => console.log("server♥"));
}
bootstrap();

