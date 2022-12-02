import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';



@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule
    ,SettingsPageRoutingModule
  ]
})
export class SettingsPageModule { }
