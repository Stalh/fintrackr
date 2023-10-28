import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
        this.logger.log('JWT Strategy initialized');
    }

    async validate(payload: any) {
        this.logger.log('Validating JWT');

        // Votre logique de validation actuelle
        const user = { userId: payload.sub, username: payload.username };

        if (!user) {
            this.logger.error('JWT validation failed');
            throw new UnauthorizedException();
        }

        this.logger.log('JWT is valid');
        return user;
    }
}
