import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginService, LoginResponseData } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription;

  constructor(
    private authService: LoginService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private httpClient: HttpClient
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<LoginResponseData>;

    this.isLoading = true;

    // if (this.isLoginMode) {
    // authObs = s

    this.authService.login(email, password);
    // } else {
    //   // authObs = 
    //   this.authService.signup(email, password);
    // }
    // if (this.authService.isAuthenticated) {
    //   this.router.navigate(['/']);
    // }
    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     // this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  // private showErrorAlert(message: string) {
  //   // const alertCmp = new AlertComponent();
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
}


