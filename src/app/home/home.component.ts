import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../login/login.service';
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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count = 0;


  selectedOption = "All";
  @ViewChild('map', { static: true }) map1: ElementRef<HTMLDivElement>;
  constructor(private authService: LoginService) { }

  ngOnInit(): void {


    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),

      ],
      target: this.map1.nativeElement,
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    const vectorlayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
        }),
      }),
    })

    let isOpen = true;
    // const modify = new Modify({ source: vectorlayer.getSource() });
    // map.addInteraction(modify);

    const draw = new Draw({
      source: vectorlayer.getSource(), type: GeometryType.POINT
    });
    map.addInteraction(draw);

    // snap = new Snap({ source: vectorlayer.getSource() });
    // map.addInteraction(snap);
    // setInterval(() => {
    //   isOpen = !isOpen;
    //   console.log(isOpen);
    //   if (isOpen) {
    //     map.removeInteraction(draw);
    //   }
    //   else {
    //     map.addInteraction(draw);
    //   }
    // }, 1000)

    const place = [29, 41];
    const point = new Point(place).transform('EPSG:4326', 'EPSG:3857');
    vectorlayer.getSource().addFeature(new Feature(point));
    map.addLayer(vectorlayer);
    (window as any).map = map
    // setInterval(() => {
    //   console.log("arrow", this)
    // }, 1000)
    // setInterval(function() {
    //   console.log("normal", this)
    // }, 1000)

    // const foo = id => {
    //   return {
    //     id: id,
    //     name: 'deneme'
    //   };
    // }
    // const foo = (id, name?: string) => {
    //   return {
    //     id: id,
    //     name: name || 'BOŞ'
    //   };
    // }
    // const foo = (id, name?: string) => ({
    //   id: id,
    //   name: name || 'BOŞ'
    // })
    // const foo = (id, name?: string) => ({
    //   id: id,
    //   name: name || 'BOŞ'
    // })

    // console.log('SONUC:', foo(6));
    // // console.log(foo(100, '100 numara'));
    // const bar = (num) => 5 * num;
    // console.log(bar(11));
  }

  logout() {
    this.authService.logout();
  }


}
