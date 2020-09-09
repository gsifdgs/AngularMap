import { Component, OnInit } from '@angular/core';
import { Data, PointData } from '../data-shared/data.model'
import { DataService } from '../data-shared/data.service'
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-objects',
  templateUrl: './data-objects.component.html',
  styleUrls: ['./data-objects.component.css']
})
export class DataObjectsComponent implements OnInit {
  data: PointData;
  updateForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'desc': new FormControl(''),
    'type': new FormControl('bridge', Validators.required),
    'active': new FormControl(false, Validators.required),
    'x': new FormControl(0, Validators.required),
    'y': new FormControl(0, Validators.required)
  });
  pointTypeArray = ['road', 'street', 'bridge'];
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.reloadForm(id);
    });

  }
  onSubmit() {
    console.log(this.updateForm)
    const sendData = {
      name: this.updateForm.get('name').value,
      x: this.updateForm.get('onla').value,
      y: this.updateForm.get('onlo').value,
      type: this.updateForm.get('type').value,
      description: this.updateForm.get('desc').value,
      active: this.updateForm.get('active').value,
    }

  }
  async reloadForm(id: number) {
    const url = `${environment.apiurl}point/${id.toString()}`;
    const data = await this.httpClient.get<PointData[]>(url).toPromise();
    // console.log('data', data);
    this.updateForm.patchValue(data);
  }

}
