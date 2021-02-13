import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MapComponent } from '../map.component';
import { DataService } from 'src/app/data-shared/data.service';
import { Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';
import Feature from 'ol/Feature';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnDestroy {
  constructor(private mapComponent: MapComponent) { }
  private select: Select;
  @Output('select') selectEventEmitter = new EventEmitter<Feature>();
  ngOnInit(): void {
    const select = new Select({
      layers: [this.mapComponent.getPointVectorLayer()],
      multi: false
    });
    this.select = select;
    select.on('select', (event: SelectEvent) => {
      if(event.selected.length === 1) {
        const feature = event.selected[0];
        const id = feature.getId();
        this.selectEventEmitter.emit(feature);
      } else {
        this.selectEventEmitter.emit(null);
      }
    })
    this.mapComponent.map.addInteraction(select);

  }
  ngOnDestroy() {
    console.log('SelectComponent - ngOnDestroy')
    this.mapComponent.map.removeInteraction(this.select);
  }
}
