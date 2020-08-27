import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  types=['Road', 'Street', 'Bridge'];
  constructor() {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'name': new FormControl(null),
      'desc': new FormControl(null),
      'type': new FormControl('Road'),
      'active': new FormControl(null),
      'onla': new FormControl(null),
      'onlo': new FormControl(null)
    })
  }
  onSubmit(){
    console.log(this.addForm)
  }

}
