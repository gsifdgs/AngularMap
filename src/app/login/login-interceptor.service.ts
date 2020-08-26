import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { LoginService } from './login.service';

@Injectable()
export class LoginInterceptorService implements HttpInterceptor {
  constructor(private authService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('login', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
