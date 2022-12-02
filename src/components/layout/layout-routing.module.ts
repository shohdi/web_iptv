import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [{
 path:'',
 component:LayoutComponent,
 loadChildren: () => import('../settings-page/settings-page.module').then(m => m.SettingsPageModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
