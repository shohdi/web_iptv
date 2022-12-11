import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { FrameworkModule } from 'src/modules/framework/framework.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SweetAlert2Module }  from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule
    ,SearchPageRoutingModule
    ,FrameworkModule
    ,FormsModule
    ,HttpClientModule

    ,ReactiveFormsModule
  ]
})
export class SearchPageModule { }
