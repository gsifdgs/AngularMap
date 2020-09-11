import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  SearchOption = "";
  TypeOption = "all";
  ActiveOption = "all";
  constructor() { }

  ngOnInit(): void {
  }
  filterPoint() {
    if(this.SearchOption!=""){
      console.log('search: ',this.SearchOption)
    }
    if (this.TypeOption !== "all") {
      console.log('type: ',this.TypeOption);
    }
    if (this.ActiveOption !== "all") {
      console.log('active: ',this.ActiveOption);
    }
    else {

    }
  }

}
