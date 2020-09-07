import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {LoginInterceptorService} from './login/login-interceptor.service'
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DataObjectsComponent } from './data-objects/data-objects.component';
import {DataService} from './data-shared/data.service';
import { MapComponent } from './map/map.component';
import { DrawComponent } from './map/draw/draw.component';
import { SelectComponent } from './map/select/select.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddComponent,
    HomeComponent,
    FilterComponent,
    DataObjectsComponent,
    MapComponent,
    DrawComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    AddComponent,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoginInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule { }
