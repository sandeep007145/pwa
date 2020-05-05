import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnecmComponent } from './onecm/onecm.component';


const routes: Routes = [
  {path: '', component: OnecmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnemRoutingModule { }
