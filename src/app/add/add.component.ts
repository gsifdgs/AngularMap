import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from '../data-shared/data.service';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  Form1: FormGroup;
  Form2: FormGroup;
  coordAll: number[];
  coordX: number;
  coordY: number;

  openInteraction = new Subject<boolean>();

  types = ['Road', 'Street', 'Bridge'];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    console.log("acildi")
    this.addForm = new FormGroup({
      'name': new FormControl(null),
      'desc': new FormControl(null),
      'type': new FormControl('Road'),
      'active': new FormControl(null),
      'onla': new FormControl(this.coordX),
      'onlo': new FormControl(this.coordY)
    });
    
    this.data.getpointCoordinates.subscribe(evtt => {
      console.log("last", evtt.getFlatCoordinates());
      this.coordAll=evtt.getFlatCoordinates()
      this.coordX=this.coordAll[0];
      this.coordY=this.coordAll[1];
      console.log(" coordx: ", this.coordX," coordy: ", this.coordY)
    this.addForm.get('onla').patchValue(this.coordX);
    this.addForm.updateValueAndValidity();
    this.addForm.get('onlo').patchValue(this.coordY);
    this.addForm.updateValueAndValidity();
    })
  }
  onSubmit() {
    this.data.messageSource.next(false);
    console.log(this.addForm)
    
  }
changeDrawTrue(){
  this.data.messageSource.next(true);
}
  changeDrawFalse() {
    this.data.messageSource.next(false);
  }
  ngOnDestroy(): void {
    console.log("kapandi")
  }
}
