import { Component, OnInit } from '@angular/core';
import {Data} from '../data-shared/data.model'
import {DataService} from '../data-shared/data.service'
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-data-objects',
  templateUrl: './data-objects.component.html',
  styleUrls: ['./data-objects.component.css']
})
export class DataObjectsComponent implements OnInit {
  data: Data;
  id: number;
  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.data = this.dataService.getData(this.id);
      }
    );
  }

}
