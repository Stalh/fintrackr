import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
