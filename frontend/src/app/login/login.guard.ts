import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }
  async canActivate():  Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated()
    if(isAuthenticated) {

      return true;
    }
    this.router.navigate(['/login'])
    return false
  }
}
