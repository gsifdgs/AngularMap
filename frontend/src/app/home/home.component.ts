import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Style } from 'ol/style';
import { Draw } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature'
import { Point } from 'ol/geom';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import GeometryType from 'ol/geom/GeometryType';
import { DataService } from '../data-shared/data.service';
import { DrawEvent } from 'ol/interaction/Draw';


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
    public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.messageSource.subscribe(booleanmap => {
      if (booleanmap == true) {
        this.dataService.mapstate = "DRAW";
      } else {
        this.dataService.mapstate = "DEFAULT"
      }
    })
  }
  
  logout() {
    // this.authService.logout();
  }

}
