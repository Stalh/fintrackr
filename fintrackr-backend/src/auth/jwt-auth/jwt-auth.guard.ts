import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard: canActivate invoked');

    // Vérifie si la route est annotée avec le décorateur @Public()
    const isPublic = this._reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Route isPublic:', isPublic);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard: handleRequest invoked');
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
