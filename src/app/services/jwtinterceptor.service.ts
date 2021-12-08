import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } 
from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable()
export class JwtinterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const user = this.userService.userValue;

    const accessToken = user?.accessToken;

    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (accessToken && isApiUrl) {
        request = request.clone({
            headers: request.headers.set("Authorization", `Bearer ${accessToken}`)
        });
    }

    return next.handle(request);
  }
}
