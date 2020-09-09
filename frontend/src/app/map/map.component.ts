import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { DataService } from '../data-shared/data.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() newpoints: boolean;
  @ViewChild('map', { static: true }) private mapElementRef: ElementRef<HTMLDivElement>;
  map: Map;
  coordAll: number[];
  private pointVectorLayer: VectorLayer;
  private pointVectorSource: VectorSource;
  constructor(private dataService: DataService) {
    const vectorlayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
        }),
      }),
    });
    this.pointVectorLayer = vectorlayer;
    this.pointVectorSource = vectorlayer.getSource();
  }

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
    this.map.addLayer(this.pointVectorLayer);
    this.dataService.featureArraySubject.subscribe(this.drawPoints);
  }

 drawPoints = (datas) => {

    const features = [];
    for (const item of datas) {
      const point = new Point([item.x, item.y]).transform('EPSG:4326', 'EPSG:3857');
      const feature = new Feature(point);
      feature.setProperties(item);
      feature.setId(item.id);
      features.push(feature);
    }
    this.pointVectorSource.clear();
    this.pointVectorSource.addFeatures(features);
  }

  public getPointVectorSource() {
    return this.pointVectorSource;
  }
  public getPointVectorLayer() {
    return this.pointVectorLayer;
  }

}
