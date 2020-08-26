import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedOption="All";
  constructor(private authService: LoginService) {}

  ngOnInit(): void {
  }
  myFunction() {
if(this.selectedOption=="All"){

}
if(this.selectedOption=="Road"){

}
if(this.selectedOption=="Street"){

}
if(this.selectedOption=="Bridge"){

}
  }
  logout(){
    this.authService.logout();
  }
}
