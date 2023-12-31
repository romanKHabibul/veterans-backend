import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix("api")
  await app.listen(process.env.APP_PORT || 3000, "0.0.0.0", () => console.log("server♥"));
}
bootstrap();

 