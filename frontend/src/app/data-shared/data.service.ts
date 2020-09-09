import { PointData } from './data.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export type MAP_STATE = "DEFAULT" | "DRAW" | "SELECT"

@Injectable()
export class DataService {
    public drawEndSubject = new Subject<number[]>();
    public featureArraySubject = new Subject<PointData[]>();
    mapstate: MAP_STATE = "SELECT"
    constructor(private httpClient: HttpClient) {
        this.refreshMapData();
    }

    public refreshMapData = async () => {
        const url = `${environment.apiurl}point`;
        const data = await this.httpClient.get<PointData[]>(url).toPromise();
        this.featureArraySubject.next(data);
    }

}
