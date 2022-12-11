import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [{
 path:'',
 component:LayoutComponent,
 loadChildren: () => import('../settings-page/settings-page.module').then(m => m.SettingsPageModule)
}
,
{
  path:'search',
  component:LayoutComponent,
  loadChildren: () => import('../search-page/search-page.module').then(m => m.SearchPageModule)
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
