import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, tap, take } from 'rxjs/operators';
  
  import { LoginService } from './login.service';
  
  @Injectable({ providedIn: 'root' })
  export class LoginGuard implements CanActivate {
    constructor(private authService: LoginService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
return this.authService.isAuthenticated().then(
(authenticated:boolean)=>{if(authenticated){return true;}
else{this.router.navigate(['/login']);}
}
    // canActivate(
    //   route: ActivatedRouteSnapshot,
    //   router: RouterStateSnapshot
    // ):
    //   | boolean
    //   | UrlTree
    //   | Promise<boolean | UrlTree>
    //   | Observable<boolean | UrlTree> {
    //   return this.authService.user.pipe(
    //     take(1),
    //     map(user => {
    //       const isAuth = !!user;
    //       if (isAuth) {
    //         return true;
    //       }
    //       return this.router.createUrlTree(['/login']);
    //     })
        // tap(isAuth => {
        //   if (!isAuth) {
        //     this.router.navigate(['/auth']);
        //   }
        // })
      );
    }
  }
  