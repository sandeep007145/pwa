import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageCheckComponent } from './storage-check/storage-check.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: StorageCheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
