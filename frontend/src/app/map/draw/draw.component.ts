import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Style } from 'ol/style';
import { Draw } from 'ol/interaction';
import GeometryType from 'ol/geom/GeometryType';
import { MapComponent } from '../map.component';
import { Point } from 'ol/geom';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit, OnDestroy {
  vectorlayer: VectorLayer;
  @Output('drawend') drawEndEventEmitter = new EventEmitter<number[]>();
  constructor(private mapComponent: MapComponent) { }
  checkDraw = false;
  getCoordinats: number[];
  private draw: Draw;
  
  ngOnInit(): void {
    const vectorlayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'green' }),
        }),
      }),
    })

    const draw = new Draw({
      source: vectorlayer.getSource(),
      type: GeometryType.POINT
    });
    this.mapComponent.map.addInteraction(draw);
    this.mapComponent.map.addLayer(vectorlayer);

    draw.on('drawend', (evt) => {
      vectorlayer.getSource().clear();
      const point = evt.feature.getGeometry() as Point
      const p2 = point.clone()
      p2.transform('EPSG:3857', 'EPSG:4326');
      const p3 = p2.getFlatCoordinates();
      this.drawEndEventEmitter.emit(p3)
      // this.data.getpointCoordinates.next(p2);
      // console.log(p2.getFlatCoordinates());
      this.getCoordinats = p3;
    });
    this.draw = draw;
    this.vectorlayer = vectorlayer
  }
  returnlayer() {
    return this.vectorlayer
  }
  ngOnDestroy() {
    this.vectorlayer.getSource().clear()
    this.mapComponent.map.removeInteraction(this.draw);
  }

}
