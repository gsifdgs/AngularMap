import { Component, OnInit } from '@angular/core';
import { Data, PointData } from '../data-shared/data.model'
import { DataService } from '../data-shared/data.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    'id': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
    'description': new FormControl(''),
    'type': new FormControl('bridge', Validators.required),
    'active': new FormControl(false, Validators.required),
    'x': new FormControl(0, Validators.required),
    'y': new FormControl(0, Validators.required)
  });
  pointTypeArray = ['road', 'street', 'bridge'];
  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }
private id:number;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.id=id;
      this.reloadForm(id);
    });
  }
  onSubmit() {
    console.log(this.updateForm)
  }
  async onUpdate() {
    const sendData = {
      name: this.updateForm.get('name').value,
      x: this.updateForm.get('x').value,
      y: this.updateForm.get('y').value,
      type: this.updateForm.get('type').value,
      description: this.updateForm.get('description').value,
      active: this.updateForm.get('active').value,
    }
    const url = `${environment.apiurl}point/${this.id.toString()}`;
    await this.httpClient.put(url, sendData).toPromise();
    this.dataService.refreshMapData();
  }
  async onDelete() {
    const url = `${environment.apiurl}point/${this.id.toString()}`;
    await this.httpClient.delete(url).toPromise();
    this.dataService.refreshMapData();
    this.router.navigate(['/']);
  }
  async reloadForm(id: number) {
    const url = `${environment.apiurl}point/${id.toString()}`;
    const data = await this.httpClient.get<PointData[]>(url).toPromise();
    // console.log('data', data);
    this.updateForm.patchValue(data);
  }

}
