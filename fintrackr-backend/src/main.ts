import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';




async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
