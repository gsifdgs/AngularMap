import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: LoginService) {}

  ngOnInit() {
    // this.authService.autoLogin();
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    // });
  }

}
