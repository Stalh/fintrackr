import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const jwtToken = localStorage.getItem('jwt');

        if (jwtToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Token attached to request:', jwtToken);
        } else {
            console.warn('No JWT token found in localStorage.');
        }


        return next.handle(request);
    }
}
