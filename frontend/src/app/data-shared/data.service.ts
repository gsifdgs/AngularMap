import { Data } from './data.model'
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { Point } from 'ol/geom';
export type MAP_STATE = "DEFAULT" | "DRAW" | "SELECT"

@Injectable()
export class DataService {
    public messageSource = new Subject<boolean>();
    public getpointCoordinates = new Subject<Point>();
    mapstate: MAP_STATE = "DEFAULT"
    id1 = 0; id2 = 1; id3 = 2;
    private data: Data[] = [
        new Data(this.id1, 'Road 51', 'WarmMedicine Hospital Road', 'Road'),
        new Data(this.id2, 'Adios Bridge', 'Adios Trion Lake Bridge', 'Bridge'),
        new Data(this.id3, 'Modorno Street', 'LookinGreat Market Street', 'Street'),
    ]
    getDatas() {
        return this.data.slice();
    }
    getData(index: number) {
        return this.data[index];
    }

}
