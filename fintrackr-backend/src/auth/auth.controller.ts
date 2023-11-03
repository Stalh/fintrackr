import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Connecter un utilisateur' })
    @ApiBody({ description: 'Données de connexion' })
    @ApiResponse({ status: 201, description: 'Connexion réussie' })
    @ApiResponse({ status: 401, description: 'Non autorisé' })
    async login(@Body() loginData: { username: string, password: string }): Promise<any> {
        const user = await this.authService.validateUser(loginData.username, loginData.password);
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }
        return this.authService.login(user);
    }
}
