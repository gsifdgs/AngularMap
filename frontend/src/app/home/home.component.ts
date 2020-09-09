import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DataService } from '../data-shared/data.service';
import { DrawEvent } from 'ol/interaction/Draw';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import Feature from 'ol/Feature';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count: number;
  currentRoute: string;
  evtt: DrawEvent;
  selectedOption = "All";
  constructor(private authService: LoginService,
    public dataService: DataService, private route: ActivatedRoute, private router: Router) { }
  public newCoordinats: any;
  ngOnInit(): void {

    this.helloChild()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.helloChild()
      }
    })
  }

  private helloChild() {
    const firstChild = this.route.snapshot.firstChild.url
    console.log('firstChild', firstChild.toString())
    if (firstChild.toString() == "add") {
      console.log("add'desin, type:default");
      this.dataService.mapstate = "DEFAULT";
    }
    else {
      console.log("add'de değisin, type:select");
      this.dataService.mapstate = "SELECT"
    }
  }
  drawEnd(point: number[]) {
    console.log(point);
    this.dataService.drawEndSubject.next(point);
  }
  selectEnd(select: Feature) {
    if (select) {
      const id = +select.getId();
      this.router.navigate(['/' + id]);
    }
    else {
      this.router.navigate(['/']);
    }
  }
  logout() {
    // this.authService.logout();
  }

}
