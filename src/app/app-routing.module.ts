import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { LoginComponent } from './login/login.component'
import { AddComponent } from './add/add.component'
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';
import { DataObjectsComponent } from './data-objects/data-objects.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', component: HomeComponent, canActivate: [LoginGuard], children: [
      { path: 'add', component: AddComponent },
      { path: '', component: FilterComponent },
      { path: ':id', component: DataObjectsComponent },
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
