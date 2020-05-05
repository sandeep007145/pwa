import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnecComponent } from './onec/onec.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: OnecComponent},
  {path: 'onem', loadChildren: () => import('./onem/onem.module').then(m => m.OnemModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
