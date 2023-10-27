import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: "YOUR-SECRET",
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
