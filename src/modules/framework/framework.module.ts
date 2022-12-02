import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from './components/loading/loading.component';
import {DbService} from './services/db-service';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    
    SweetAlert2Module 
  ],
  providers: [
    DbService
  ],
  exports:[
    LoadingComponent
  ]
 
})
export class FrameworkModule { }
