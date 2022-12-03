import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { FrameworkModule } from 'src/modules/framework/framework.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SweetAlert2Module }  from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule
    ,SettingsPageRoutingModule
    ,FrameworkModule
    ,FormsModule
    ,HttpClientModule

    ,ReactiveFormsModule
  ]
})
export class SettingsPageModule { }
