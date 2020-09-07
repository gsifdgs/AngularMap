import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Style } from 'ol/style';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature'
import { Point } from 'ol/geom';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import GeometryType from 'ol/geom/GeometryType';
import { DrawComponent } from '../map/draw/draw.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) private mapElementRef: ElementRef<HTMLDivElement>;
  map: Map;
  
  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),

      ],
      target: this.mapElementRef.nativeElement,
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
//draw

  }
getScratchVectorSource(){

}
}
