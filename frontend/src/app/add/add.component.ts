import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { DataService } from '../data-shared/data.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  addForm = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'desc': new FormControl(null),
    'type': new FormControl('road', Validators.required),
    'active': new FormControl(false, Validators.required),
    'lat': new FormControl(null, Validators.required),
    'lon': new FormControl(null, Validators.required)
  });

  openInteraction = new Subject<boolean>();

  types = ['road', 'street', 'bridge'];

  private drawEndSubscription: Subscription;
  constructor(private httpClient: HttpClient, private dataService: DataService) { }
  
  ngOnInit(): void {
    this.drawEndSubscription = this.dataService.drawEndSubject.subscribe((point) => {
      const [x, y] = point;
      this.addForm.patchValue({
        lon: x,
        lat: y,
      })
    })
  }
  async onSubmit() {
    console.log(this.addForm)
    const payload = {
      name: this.addForm.get('name').value,
      x: this.addForm.get('lon').value,
      y: this.addForm.get('lat').value,
      type: this.addForm.get('type').value,
      description: this.addForm.get('desc').value,
      active: this.addForm.get('active').value,
    }
    const url = `${environment.apiurl}point`;
    await this.httpClient.post(url, payload).toPromise();
    this.dataService.refreshMapData();
  }
  changeDrawTrue() {
    this.dataService.mapstate = 'DRAW';
  }
  ngOnDestroy(): void {
    console.log("kapandi");
    if(this.drawEndSubscription) {
      this.drawEndSubscription.unsubscribe();
    }
  }
}
