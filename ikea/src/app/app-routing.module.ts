import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Services/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    // canLoad: [AuthGuard],
    data: {
      allowedRole: 'admin'
    }, loadChildren: () => import('./Modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: ':id',
    // canLoad: [AuthGuard],
    data: {
      allowedRole: 'admin'
    }, loadChildren: () => import('./Modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
