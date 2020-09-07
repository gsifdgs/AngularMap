import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  selectedOption="All";
  constructor() { }

  ngOnInit(): void {
  }
  myFunction() {
if(this.selectedOption=="All"){

}
if(this.selectedOption=="Road"){

}
if(this.selectedOption=="Street"){

}
if(this.selectedOption=="Bridge"){

}
  }

}
