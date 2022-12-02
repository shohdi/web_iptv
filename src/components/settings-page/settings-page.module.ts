import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { FrameworkModule } from 'src/modules/framework/framework.module';



@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule
    ,SettingsPageRoutingModule
    ,FrameworkModule
  ]
})
export class SettingsPageModule { }
